const mongoose = require("mongoose")

const yearlyGradeSchema = new mongoose.Schema(
  {
    yearly_grade: {
      type: String,
      enum: {
        values: [
          "nursery",
          "lkg",
          "ukg",
          "one",
          "two",
          "three",
          "four",
          "five",
          "six",
          "seven",
          "eight",
          "nine",
          "ten",
        ],
        message: "Please Select Yearly Grade from the Options",
      },
      required: true,
      lowercase: true,
      unique: true,
    },
    number_of_students: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const yearlyGradeModel = mongoose.model("YearlyGrade", yearlyGradeSchema)

module.exports = { yearlyGradeModel }
