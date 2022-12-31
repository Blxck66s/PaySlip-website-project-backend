const mongoose = require("mongoose");
// const randomize = require("randomatic");
// default: (generatePassword = () => {
//   randomize.isCrypto("Aa0!", 12, { exclude: "~^&+-={}[];',." });
const employeeSchema = new mongoose.Schema({
  employeeCode: { type: String, required: true, unique: true },
  nameENG: { type: String, required: true },
  nameTH: { type: String },
  position: { type: String, required: true },
  department: { type: String, required: true },
  employmentDate: { type: Date, required: true },
  bankAccount: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("Employee", employeeSchema);
