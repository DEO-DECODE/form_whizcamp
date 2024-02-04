const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
connectDatabase();
const server = app.listen(8000, () => {
  console.log(`Server is working on http://localhost:8000`);
});
