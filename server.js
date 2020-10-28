const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/quotes', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db')
});

app.use(express.json())
app.use(cors())

const quotesRouter = require('./routes/quotes')
// const categoriesRouter = require('.routes/categories')

app.use('/quotes', quotesRouter)
// app.use('/categories', categoriesRouter)

app.listen(5500, () => console.log('Server running...'))