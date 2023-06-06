const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


  const numberValidators = [
    {
      validator: (number) => {
        if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
          return false;
        }
        return true;
      },
      msg: "must be at least 8 digits",
    },
    {
      validator: (number) => {
        return /^\d{2,3}-\d+$/.test(number);
      },
      msg: "invalid phone number",
    },
  ]

const schema = new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      required: true,
      unique: true
    },
    number:{
      type: String,
      validate: numberValidators,
      required: true

    }
})

schema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', schema)
