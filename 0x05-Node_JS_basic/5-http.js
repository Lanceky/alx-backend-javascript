const http = require('http');
const { readFile } = require('fs').promises;

const countStudents = async (path) => {
  try {
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

    for (const [field, data] of Object.entries(students)) {
      response += `Number of students in ${field}: ${data.count}. List: ${data.names.join(', ')}\n`;
    }

    return response.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  if (req.url === '/') {
    res.end('Hello ALX!');
  } else if (req.url === '/students') {
    countStudents(process.argv[2])
      .then((data) => {
        res.end(data);
      })
      .catch((error) => {
        res.statusCode = 404;
        res.end(error.message);
      });
  } else {
    res.statusCode = 404;
    res.end('Not found\n');
  }
});

const port = 1245;
app.listen(port);

module.exports = app;
