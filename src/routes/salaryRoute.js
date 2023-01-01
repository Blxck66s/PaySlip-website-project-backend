const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salaryControllers");
const adminAuth = require("../middlewares/adminAuth");
const auth = require("../middlewares/auth");

router.post("/", adminAuth, salaryController.createSalary);
router.get("/:eid", auth, salaryController.getSpecificEmployeeSalaries);
router.delete("/:eid", adminAuth, salaryController.deleteOneSalary);
module.exports = router;
