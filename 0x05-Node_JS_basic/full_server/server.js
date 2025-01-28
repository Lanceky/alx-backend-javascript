import express from 'express';
import routes from './routes';

const app = express();
const port = 1245;

app.set('dbFile', process.argv[2]); // Set the database file path dynamically
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
