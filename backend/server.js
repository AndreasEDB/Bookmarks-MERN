const express = require('express')
const path = require('path')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 5500;

require('dotenv').config()


mongoose.connect(process.env.DB_PATH, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db')
});

app.use(express.static('public'));
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));




const linksRouter = require('./routes/links.routes')
const categoryRouter = require('./routes/categories.routes')

app.use('/links', linksRouter)
app.use('/categories', categoryRouter)

app.listen(port, () => console.log('Server running on port ' + port))