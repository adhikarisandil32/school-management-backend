const mongoose = require("mongoose")
const { server } = require("./app")
const {
  addFieldToAllDocuments,
} = require("./functions/insertGenderToAllStudentField")

const PORT = process.env.PORT || 5000

mongoose
  .connect(process.env.MONGODB_LOCAL_URL)
  .then(() => {
    console.log("mongodb connected")

    server.listen(PORT, () => {
      console.log(`server ready at port ${PORT}`)

      addFieldToAllDocuments()
    })
  })
  .catch((err) => {
    console.log(err)
  })
