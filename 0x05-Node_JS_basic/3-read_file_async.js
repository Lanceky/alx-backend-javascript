const fs = require('fs').promises;

const countStudents = async (path) => {
  try {
    const fileContent = await fs.readFile(path, 'utf-8');
    const lines = fileContent.trim().split('\n');
    const students = lines.slice(1).filter((line) => line.length > 0);
    const fields = {};
    console.log(`Number of students: ${students.length}`);
    students.forEach((student) => {
      const [firstName, , , field] = student.split(',');
      if (!fields[field]) {
        fields[field] = { count: 0, names: [] };
      }
      fields[field].count += 1;
      fields[field].names.push(firstName);
    });
    Object.entries(fields).forEach(([field, data]) => {
      console.log(`Number of students in ${field}: ${data.count}. List: ${data.names.join(', ')}`);
    });
    return true;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

module.exports = countStudents;
