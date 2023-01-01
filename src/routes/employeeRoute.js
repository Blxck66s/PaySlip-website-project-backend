const express = require("express");
const router = express.Router();
const employeeControllers = require("../controllers/employeeControllers");
const adminAuth = require("../middlewares/adminAuth");

router.get("/", adminAuth, employeeControllers.getEmployees);
router.delete("/:eid", adminAuth, employeeControllers.deleteOneEmployee);
module.exports = router;
