const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
var knex = require('knex')

const database = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
});

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req,res) => {res.send('it is working')})

app.post('/contact', (req, res) => {
    const { name, email, message} = req.body
    database('Messages').insert({
        Name: name,
        email: email,
        message: message
    }) 
    .then(res.send('success'))
    .catch(err => res.status(400).send('failure'))
})

app.listen(process.env.PORT, () => {
    console.log('app is running')
})