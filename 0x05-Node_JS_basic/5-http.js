const http = require('http');
const fs = require('fs');
const path = require('path');

const countStudents = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n').filter((line) => line.length > 0);
        const students = lines.slice(1); // Skip the header row
        const fields = {};

        students.forEach((student) => {
          const [firstName, , , field] = student.split(',');
          if (!fields[field]) {
            fields[field] = { count: 0, names: [] };
          }
          fields[field].count += 1;
          fields[field].names.push(firstName);
        });

        const summary = [`Number of students: ${students.length}`];
        Object.entries(fields).forEach(([field, data]) => {
          summary.push(
            `Number of students in ${field}: ${data.count}. List: ${data.names.join(', ')}`,
          );
        });

        resolve(summary.join('\n'));
      }
    });
  });

const app = http.createServer((req, res) => {
  const filePath = path.resolve(__dirname, process.argv[2]);

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    countStudents(filePath)
      .then((data) => {
        res.end(`This is the list of our students\n${data}`);
      })
      .catch((error) => {
        res.end(`This is the list of our students\n${error.message}`);
      });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

app.listen(1245);

module.exports = app;
