const express = require("express")
const studentsRoute = express.Router()
const {
  postStudent,
  getStudent,
  deleteStudent,
  patchStudent,
} = require("../controllers/student.controller")

studentsRoute.post("/", postStudent)

studentsRoute.get("/", getStudent)

module.exports = { studentsRoute }
