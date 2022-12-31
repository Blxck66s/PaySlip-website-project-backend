//security
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Employee = require("../models/employees");

exports.register = async (req, res, next) => {
  try {
    //request
    const {
      nameTH,
      nameENG,
      department,
      employmentDate,
      employeeCode,
      bankAccount,
      username,
      password,
      position,
    } = req.body;
    //security
    const hashedPassword = await bcrypt.hash(password, 10);
    //database created
    const employee = new Employee({
      nameTH,
      nameENG,
      employeeCode,
      bankAccount,
      username,
      password: hashedPassword,
      department,
      employmentDate,
      position,
    });
    const newEmployee = await employee.save();

    //response
    res.status(201).json({ message: "done" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    //request
    const { username, password } = req.body;
    //validate
    if (typeof username !== "string") {
      throw new Error("username is invalid");
    }
    if (typeof password !== "string") {
      throw new Error("password is invalid");
    }
    //find user
    const pulledUser = await Employee.findOne({ username });
    //if user doesnt match database
    if (!pulledUser) {
      throw new Error("this username doesnt exist");
    }

    // if user password doesnt match database
    const isPasswordMatch = await bcrypt.compare(password, pulledUser.password);
    if (!isPasswordMatch) {
      throw new Error("password is invalid");
    }

    //token created
    const token = jwt.sign({ id: pulledUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    //response
    res.status(200).json({
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};
