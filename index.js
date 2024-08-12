require("dotenv").config();

const server = require("./src/server");

const db = require("./src/lib/db");

const port = process.env.PORT || 8080;

db.connect()
  .then(() => {
    console.log("BD connect");

    server.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((error) => {
    console.error("DB connection error", error);
    process.exit(1);
  });
