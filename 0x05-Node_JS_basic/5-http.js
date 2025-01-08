const http = require('http');
const { readFile } = require('fs').promises;

const processStudentData = async (filePath) => {
  try {
    const data = await readFile(filePath, 'utf8');
    const lines = data.trim().split('\n').slice(1); // Remove header and empty lines
    const students = {};
    
    lines.forEach(line => {
      if (line.trim()) { // Skip empty lines
        const [firstname, , , field] = line.split(',');
        if (!students[field]) {
          students[field] = { count: 0, names: [] };
        }
        students[field].count += 1;
        students[field].names.push(firstname);
      }
    });

    let response = 'This is the list of our students\n';
    const total = Object.values(students).reduce((sum, field) => sum + field.count, 0);
    response += `Number of students: ${total}\n`;

    for (const [field, data] of Object.entries(students)) {
      response += `Number of students in ${field}: ${data.count}. List: ${data.names.join(', ')}\n`;
    }

    return response.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  if (req.url === '/') {
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    try {
      const databasePath = process.argv[2];
      const studentData = await processStudentData(databasePath);
      res.end(studentData);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.end('Not found');
  }
});

app.listen(1245);

module.exports = app;
