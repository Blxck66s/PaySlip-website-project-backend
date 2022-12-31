//core imports
require("dotenv").config();
const express = require("express"); //for API
const cors = require("cors"); // for cross-domain-ports requests
const mongoose = require("mongoose");

//sync or create database tables
//
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  ignoreUndefined: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
//

//routes import
const authRoute = require("./src/routes/authRoute");
const salaryRoute = require("./src/routes/salaryRoute");
const employeeRoute = require("./src/routes/employeeRoute");

//middlewares import
const notFound = require("./src/middlewares/notFound");
const error = require("./src/middlewares/error");

//cores
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/auth", authRoute);
app.use("/salary", salaryRoute);
app.use("/employee", employeeRoute);

//middlewares
app.use(notFound);
app.use(error);

//server runner
app.listen(3001, () => {
  console.log(`app server listening on port 3001`);
});
