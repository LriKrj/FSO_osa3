const express = require("express");
const morgan = require('morgan')
const cors = require('cors')
const app = express();
require('dotenv').config()
const Contact = require('./models/contact');

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

let length = persons.length
const text = `Phonebook has info for ${length} people`;
const currentTime = new Date();

app.get('/info', (req, res) => {
  res.send(`<p>${text}</p><p>Current time: ${currentTime}</p>`);
});
  
app.get('/api/persons/:id', (request, response) => {
  const id =  Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    response.json(person)
  }else {
    response.status(404).end()
  } 
})

app.get('/', (req, res) => {
  res.send("<h1>hello world!</h1>");
  
});

app.get('/api/persons', (req, res) => {
    Contact
    .find({})
    .then(contact => {
      res.json(contact)
    })
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (body.name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    const contact = new Contact({
      name: body.name,
      number: body.number
    })
  
    contact.save().then(savedContact => {
      res.json(savedContact)
    })
  })
  


app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  
  const person = persons.find(person => person.id===id)
  const index = persons.indexOf(person)
  persons.splice(index, 1)
  res.send(person)
  
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
