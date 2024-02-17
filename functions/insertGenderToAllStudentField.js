// The basic idea of this function is if any field is to be added later, just fire up the function, loop and ask the field value for each of the newly added field and set it into the database.

// trouble lies taking commandline input from the console in node

/* 
The issue you're encountering stems from the asynchronous nature of JavaScript and the readline interface. The for loop doesn't wait for the user input before continuing to the next iteration. As a result, it prompts for input for each student in rapid succession without waiting for a response. Additionally, the readline interface isn't closed properly within the loop.

To address this, you can use a recursive approach or use async/await with a Promise-based version of readline. 

                                      - ChatGPT
*/

const { studentModel } = require("../models/student.model")
const readline = require("readline")

const addFieldToAllDocuments = async () => {
  try {
    const studentDocuments = await studentModel.find({})

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const updateStudent = async (index) => {
      if (index === studentDocuments.length) {
        rl.close()
        return
      }

      const student = studentDocuments[index]

      const gender = await new Promise((resolve) => {
        rl.question(`Gender of ${student.name}: `, (input) => {
          resolve(input.trim().toLowerCase())
        })
      })

      await studentModel.updateOne({ _id: student._id }, { gender: gender })

      updateStudent(index + 1)
    }

    updateStudent(0)

    /* for (let i = 0; i < studentDocuments.length; i++) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      const gender = await new Promise((resolve) => {
        rl.question(
          `Gender of ${studentDocuments[i].name}: `,

          function (gender) {
            resolve(gender)
          }
        )
      })

      console.log(gender)

      await studentModel.updateOne(
        { id: studentDocuments[i]._id },
        { gender: gender.toLowerCase() }
      )

      rl.close()
    } */
  } catch (err) {
    console.log(err)
  }
}

module.exports = { addFieldToAllDocuments }
