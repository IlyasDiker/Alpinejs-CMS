const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')

const app = express();
app.use(bodyParser.json());
app.use(cors())
app.options('*', cors())
const port = 3000;

const prisma = new PrismaClient()

app.get('/', (req, res) => {
  res.send('test crud')
}); 


const users = require('./controllers/user.controller.js');

app.post('/users', users.create);
app.get('/users', users.findAll);
app.get('/users/:id', users.findOne);
app.put('/users/:id', users.update);
app.delete('/users/:id', users.delete);
app.get('/schema/users', users.schema);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});