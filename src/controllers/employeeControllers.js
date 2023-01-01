const Employee = require("../models/employees");
const Salary = require("../models/salaries");

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().select(
      "-username -password -admin"
    );
    res.status(200).json({ employees });
  } catch (err) {
    next(err);
  }
};
exports.deleteOneEmployee = async (req, res, next) => {
  try {
    //request
    const { eid } = req.params;
    const idList = await Salary.find({ Employee: eid }).select("Employee");
    const NewIdList = idList.map((item) => item.Employee);

    const deleteReference = await Salary.deleteMany({
      Employee: { $in: NewIdList },
    });
    const deleteEmployee = await Employee.deleteOne({ _id: eid });

    res.status(200).json({ message: "done" });
  } catch (err) {
    next(err);
  }
};
