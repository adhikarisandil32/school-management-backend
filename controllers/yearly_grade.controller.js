const mongoose = require("mongoose")
const { yearlyGradeModel } = require("../models/yearly_grade.model")
const { studentModel } = require("../models/student.model")

const getYearlyGrade = async (req, res) => {
  try {
    const allYealyGrades = await yearlyGradeModel
      .find({})
      .select(["_id", "yearly_grade", "number_of_students"])

    // .select(["-createdAt", "-updatedAt", "-_v"])
    // would give the same result

    return res.status(201).json({
      success: true,
      data: allYealyGrades,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

/*
const postYearlyGrade = async (req, res) => {
  try {
    const { yearly_grade } = req.body

    const existingYearlyGrade = await yearlyGradeModel.findOne({
      yearly_grade: yearly_grade.toLowerCase(),
    })

    if (existingYearlyGrade) {
      return res.status(409).json({
        success: false,
        error: {
          status: 409,
          message: "Yearly Grade Already Exists",
        },
      })
    }

    const numberOfStudents = await studentModel.countDocuments({
      yearly_grade: existingYearlyGrade._id,
    })

    const result = await yearlyGradeModel.create({
      yearly_grade: yearly_grade.toLowerCase(),
      number_of_students: numberOfStudents,
    })

    return res.status(201).json({
      success: true,
      data: result,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({
        success: false,
        error: {
          status: 400,
          message: error.message,
        },
      })
    }

    return res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Internal Server Error",
        errorMessage: error,
      },
    })
  }
}
*/

const deleteYearlyGrade = async (req, res) => {}

const patchYearlyGrade = async (req, res) => {}

module.exports = {
  getYearlyGrade,
  // postYearlyGrade,
  deleteYearlyGrade,
  patchYearlyGrade,
}
