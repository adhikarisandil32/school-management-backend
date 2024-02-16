const express = require("express")
const cors = require("cors")
const app = express()
const http = require("http")
const server = http.createServer(app)
const dotenv = require("dotenv")
const { studentsRoute } = require("./routes/student.route")
const { yearlyGradeRoute } = require("./routes/yearly_grade.route")

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("Welcome, JavaScript Developer")
})

app.use("/api/v1/students", studentsRoute)
app.use("/api/v1/classes", yearlyGradeRoute)

module.exports = { server }
