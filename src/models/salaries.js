const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema({
  PayrollPeriod: { type: Date, required: true },
  PaymentDate: { type: Date, required: true },
  Employee: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  Earnings: {
    Salary: { type: Number, default: 0 },
    OverTime: { type: Number, default: 0 },
    Commision: { type: Number, default: 0 },
    AllowanceCostOfLivings: { type: Number, default: 0 },
    Bonus: { type: Number, default: 0 },
    OthersEarnings: { type: Number, default: 0 },
  },
  Deductions: {
    SocialSecurityFund: { type: Number, default: 0 },
    IncomeTax: { type: Number, default: 0 },
    AbsentLeaveLate: { type: Number, default: 0 },
    OthersDeductions: { type: Number, default: 0 },
  },
  Totals: {
    YTDearnings: { type: Number, default: 0 },
    YTDIncomeTaxs: { type: Number, default: 0 },
    AccumulatedSSF: { type: Number, default: 0 },
    TotalEarnings: { type: Number, default: 0 },
    TotalDeductions: { type: Number, default: 0 },
    NetIncome: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Salary", salarySchema);
