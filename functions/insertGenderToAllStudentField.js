// The basic idea of this function is if any field is to be added later, just fire up the function, loop and ask the field value for each of the newly added field and set it into the database.

// trouble lies taking commandline input from the console in node

const { studentModel } = require("../models/student.model")
const readline = require("readline")

const addFieldToAllDocuments = async (id) => {
  try {
    const studentDocuments = await studentModel.find({})

    for (let i = 0; i < studentDocuments.length; i++) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      rl.question(
        `Gender of ${studentDocuments[i].name}:`,
        async function (gender) {
          await studentModel.updateOne(
            { id: studentDocuments[i]._id },
            { gender: gender }
          )
        }
      )
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = { addFieldToAllDocuments }
