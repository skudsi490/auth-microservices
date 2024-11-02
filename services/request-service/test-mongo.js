const mongoose = require('mongoose');

mongoose.connect('mongodb://host.docker.internal:27017/werkstudentDB')
  .then(() => {
    console.log("Connected to MongoDB successfully");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });
