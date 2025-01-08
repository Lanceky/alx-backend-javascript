const http = require('http');
const { readFile } = require('fs').promises;

const countStudents = async (path) => {
  try {
    if (!path) {
      throw new Error('Cannot load the database');
    }
    const data = await readFile(path, 'utf8');
    const lines = data.trim().split('\n').slice(1);
    const students = {};

    lines.forEach((line) => {
      if (line.trim()) {
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

    Object.entries(students).forEach(([field, data]) => {
      response += `Number of students in ${field}: ${data.count}. List: ${data.names.join(', ')}\n`;
    });

    return response.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  const url = req.url;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello ALX!');
  } else if (url === '/students') {
    try {
      const data = await countStudents(process.argv[2]);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end(error.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  }
});

const port = 1245;

app.listen(port);

module.exports = app;
