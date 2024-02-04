const mongoose = require("mongoose");
const connectDatabase = async () => {
  await mongoose.connect("mongodb://127.0.0.1/Formwhizcamp").then((data) => {
    console.log(
      `MongoDB was successFully connected on host : ${data.connection.host}`
    );
  });
};
module.exports = connectDatabase;
