const express = require("express")
const yearlyGradeRoute = express.Router()
const {
  getYearlyGrade,
  // postYearlyGrade,
  deleteYearlyGrade,
  patchYearlyGrade,
} = require("../controllers/yearly_grade.controller")

/* yearlyGradeRoute.post("/", postYearlyGrade) */

yearlyGradeRoute.get("/", getYearlyGrade)

module.exports = { yearlyGradeRoute }
