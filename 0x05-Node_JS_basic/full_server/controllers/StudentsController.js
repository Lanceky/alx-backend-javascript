const readDatabase = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    const dbFilePath = req.app.get('dbFile');

    try {
      const fields = await readDatabase(dbFilePath);
      const response = ['This is the list of our students'];

      Object.keys(fields)
        .sort((a, b) => a.localeCompare(b))
        .forEach((field) => {
          response.push(
            `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
          );
        });

      res.status(200).send(response.join('\n'));
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;
    const dbFilePath = req.app.get('dbFile');

    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const fields = await readDatabase(dbFilePath);
      if (fields[major]) {
        res.status(200).send(`List: ${fields[major].join(', ')}`);
      } else {
        res.status(200).send('List:');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = StudentsController;
