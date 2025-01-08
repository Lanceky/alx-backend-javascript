const http = require('http');
const fs = require('fs').promises;

const countStudents = async (path) => {
  try {
    const fileContent = await fs.readFile(path, 'utf-8');
    const lines = fileContent.trim().split('\n');
    const students = lines.slice(1).filter((line) => line.length > 0);
    const fields = {};
    let output = `Number of students: ${students.length}\n`;
    students.forEach((student) => {
      const [firstName, , , field] = student.split(',');
      if (!fields[field]) {
        fields[field] = { count: 0, names: [] };
      }
      fields[field].count += 1;
      fields[field].names.push(firstName);
    });
    Object.entries(fields).forEach(([field, data]) => {
      output += `Number of students in ${field}: ${data.count}. List: ${data.names.join(', ')}`;
    });
    return output;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then((output) => {
        res.end(`This is the list of our students\n${output}`);
      })
      .catch(() => {
        res.end('This is the list of our students\nCannot load the database');
      });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

app.listen(1245);

module.exports = app;
