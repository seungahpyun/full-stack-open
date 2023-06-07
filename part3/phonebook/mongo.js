const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://seungahpyun:${password}@cluster0.hjw8ibf.mongodb.net/phonebook?retryWrites=true&w=majority`

const Person = mongoose.model(
  'Person',
  new mongoose.Schema({
    name: String,
    number: String,
  })
)

mongoose.connect(url).then(() => {
  switch (process.argv.length) {
    case 3:
      Person.find({}).then((data) => {
        console.log('phonebook:')
        data.forEach((person) => {console.log(`${person.name} ${person.number}`)})
        mongoose.connection.close()
      })
      break;
    case 5:{
      const name = process.argv[3],
            number = process.argv[4]
      const person = new Person({name, number})
      person.save().then(() => {
        console.log(`added ${name} ${number} to phonebook`)
    })
    break
    }
    default:
      mongoose.connection.close()
  }
})
