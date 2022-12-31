const Employee = require("../models/employees");
const Salary = require("../models/Salaries");
const moment = require("moment");
exports.createSalary = async (req, res, next) => {
  try {
    //request
    const { PayrollPeriod, PaymentDate, Employee, Earnings, Deductions } =
      req.body;

    //database check
    const Salaries = await Salary.find({
      Employee,
      PayrollPeriod: {
        $gte: moment(PayrollPeriod).startOf("year"),
        $lte: moment(PayrollPeriod).endOf("year"),
      },
    });

    //validate
    Salaries.map((item) => {
      if (moment(item.PayrollPeriod).year() === moment(PayrollPeriod).year()) {
        if (
          moment(item.PayrollPeriod).month() === moment(PayrollPeriod).month()
        ) {
          throw new Error("this month already had data");
        }
      }
    });

    //database created
    TotalEarnings =
      (+Earnings?.Salary || 0) +
        (+Earnings?.OverTime || 0) +
        (+Earnings?.Commision || 0) +
        (+Earnings?.AllowanceCostOfLivings || 0) +
        (+Earnings?.Bonus || 0) +
        (+Earnings?.OthersEarnings || 0) || 0;
    TotalDeductions =
      (+Deductions?.SocialSecurityFund || 0) +
      (+Deductions?.IncomeTax || 0) +
      (+Deductions?.AbsentLeaveLate || 0) +
      (+Deductions?.OthersDeductions || 0);

    const salary = new Salary({
      PayrollPeriod,
      PaymentDate,
      Employee,
      Earnings,
      Deductions,
      Totals: {
        TotalEarnings,
        TotalDeductions,
        NetIncome: TotalEarnings - TotalDeductions,
        YTDearnings:
          TotalEarnings +
          Salaries.reduce((sum, item) => sum + item.Totals.TotalEarnings, 0),
        YTDIncomeTaxs:
          (+Deductions?.IncomeTax || 0) +
          Salaries.reduce((sum, item) => sum + item.Deductions.IncomeTax, 0),
        AccumulatedSSF:
          (+Deductions?.SocialSecurityFund || 0) +
          Salaries.reduce(
            (sum, item) => sum + item.Deductions.SocialSecurityFund,
            0
          ),
      },
    });
    const newSalary = await salary.save();

    //response
    res.status(201).json({ newSalary });
  } catch (err) {
    next(err);
  }
};

exports.getSpecificEmployeeSalaries = async (req, res, next) => {
  try {
    //request
    const { eid } = req.params;
    const { year } = req.query;

    const Salaries = await Salary.find({
      Employee: eid,
      PayrollPeriod: year
        ? {
            $gte: moment(year).startOf("year"),
            $lte: moment(year).endOf("year"),
          }
        : undefined,
    }).populate("Employee", "-username -password -admin");

    res.status(200).json({ Salaries });
  } catch (err) {
    next(err);
  }
};

// exports.getSalaries = async (req, res, next) => {
//   try {
//     const Salaries = await Salary.find().populate("Employee");
//     res.status(200).json({ Salaries });
//   } catch (err) {
//     next(err);
//   }
// };