const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeControllers");

router.get("/", employeeControllers.getEmployees);

module.exports = router;
