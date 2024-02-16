const mongoose = require("mongoose")
const { studentModel } = require("../models/student.model")
const { yearlyGradeModel } = require("../models/yearly_grade.model")

const postStudent = async (req, res) => {
  try {
    const {
      name,
      gender,
      yearly_grade,
      father_name,
      mother_name,
      parent_phone_number_1,
      parent_phone_number_2,
      address,
    } = req.body

    const yearlyGradeDocument = await yearlyGradeModel.findOneAndUpdate(
      {
        yearly_grade: yearly_grade.toLowerCase(),
      },
      {
        number_of_students: 0,

        /*
        // below is not allowed inside update

        function () {
          console.log(this.number_of_students)

          return 0
        },
        */
      },
      {
        new: true,
        upsert: true,
      }
    )

    const newlyCreatedStudent = await studentModel.create({
      name: name,
      gender: gender,
      yearly_grade: yearlyGradeDocument._id,
      father_name: father_name,
      mother_name: mother_name,
      parent_phone_number_1: parent_phone_number_1,
      parent_phone_number_2: parent_phone_number_2,
      address: address,
    })

    const updatedYearlyGrade = await yearlyGradeModel.findOneAndUpdate(
      {
        yearly_grade: yearly_grade.toLowerCase(),
      },
      {
        number_of_students: await studentModel.countDocuments({
          yearly_grade: yearlyGradeDocument._id,
        }),
      },
      {
        new: true,
      }
    )

    return res.status(201).json({
      success: true,
      data: newlyCreatedStudent,
      updatedYearlyGrade: updatedYearlyGrade,
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
        errorMsg: error,
      },
    })
  }
}

const getStudent = async (req, res) => {
  // ?per_page=10&page=1&sort=name,father_name,mother_name
  // above is the format for getting search query
  const limitPerPage = Math.floor(req.query.per_page) ?? 10
  const page = Math.floor(req.query.page) ?? 1

  // sort is sent and recieved as comma seperated entity
  const sort = req.query.sort ? req.query.sort.toLowerCase() : ""

  // this field shall contain field names to sort as { name: 'asc', father_name: 'asc', mother_name: 'asc' }
  const sortingField = {}

  // object with each fieldname is added in such way that the field is sorted in ascending order
  // in the absense of field, the general order takes place
  sort.split(",").forEach((sortingQueryName) => {
    sortingField[sortingQueryName] = "asc"
  })

  try {
    const studentDocuments = await studentModel
      .find({})
      .select(["-createdAt", "-updatedAt", "-__v"])
      .sort(sortingField)
      .limit(limitPerPage)
      .skip((page - 1) * limitPerPage)

    return res.status(201).json({
      success: true,
      total: await studentModel.countDocuments({}),
      per_page: limitPerPage,
      page: page,
      data: studentDocuments,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      error: {
        status: 500,
        message: "Internal Server Error",
        errorMsg: error,
      },
    })
  }
}

const deleteStudent = (req, res) => {}

const patchStudent = (req, res) => {}

module.exports = { postStudent, getStudent, deleteStudent, patchStudent }
