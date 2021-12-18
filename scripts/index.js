const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/course-db';

const runScript = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`connected to ${MONGO_URI}`);
    // do what you need
  } catch (error) {
    console.log(error);
  } finally {
    await mongoose.connection.close();
    console.log('conection closed');
  }
};

runScript();
