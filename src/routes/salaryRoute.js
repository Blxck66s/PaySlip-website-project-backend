const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryControllers");
const auth = require("../middlewares/auth");

router.post("/", salaryController.createSalary);
router.get("/:eid", salaryController.getSpecificEmployeeSalaries);
module.exports = router;
