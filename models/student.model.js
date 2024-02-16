const mongoose = require("mongoose")

// update required for age and gender
// research how to do it without having to delete
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Please Select from Provided Values Only",
      },
      lowercase: true,
      required: true,
    },
    yearly_grade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "YearlyGrade",
      required: true,
    },
    father_name: {
      type: String,
      required: function () {
        return !this.mother_name
      },
    },
    mother_name: {
      type: String,
      required: function () {
        return !this.father_name
      },
    },
    parent_phone_number_1: {
      type: String,
      required: true,
      maxLength: 10,
      minLength: 10,
    },
    parent_phone_number_2: {
      type: String,
      maxLength: 10,
      minLength: 10,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const studentModel = mongoose.model("Student", studentSchema)

module.exports = { studentModel }
