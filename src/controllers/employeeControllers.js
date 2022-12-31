const Employee = require("../models/employees");
const Salary = require("../models/salaries");
const moment = require("moment");

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ employees });
  } catch (err) {
    next(err);
  }
};
