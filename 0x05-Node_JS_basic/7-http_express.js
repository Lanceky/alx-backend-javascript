const express = require('express');
const { readFile } = require('fs').promises;

const app = express();
const port = 1245;

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

app.get('/', (req, res) => {
  res.send('Hello ALX!');
});

app.get('/students', async (req, res) => {
  try {
    const databasePath = process.argv[2];
    const studentData = await processStudentData(databasePath);
    res.send(studentData);
  } catch (error) {
    res.send(error.message);
  }
});

app.listen(port);

module.exports = app;
