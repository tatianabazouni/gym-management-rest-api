require('dotenv').config();

const app = require('./app');
const connectMongoDB = require('./config/mongodb');
const { connectSQLite } = require('./config/sqlite');
require('./models/Feedback');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectMongoDB();
  await connectSQLite();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
};

startServer();
