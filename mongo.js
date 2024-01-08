const mongoose = require('mongoose')



if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://laurikarjalainen3:${password}@puhelinclusrer.clamcfo.mongodb.net/Puhelinluettelo?retryWrites=true&w=majority

  `

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('contact', contactSchema)

const newName = process.argv[3]
const newNumber = process.argv[4]

const contact = new Contact({
  name: newName,
  number: newNumber,
})

if (process.argv.length===3) {
    console.log('Phonebook:')
    Contact.find({}).then(result => {
        result.forEach(contact => {
          console.log(contact.name, contact.number)
        })
        mongoose.connection.close()
      })
      return
}


contact.save().then(result => {
  console.log(`added ${newName} number ${newNumber} to phonebook`)
  mongoose.connection.close()
})