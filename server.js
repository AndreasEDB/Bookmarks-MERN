const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const publicPath = path.join(__dirname, '..', 'build');

// mongoose.connect('mongodb://localhost:27017/links', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://andreas:CJfgksSXZw8uMdh@andreas.ccvvu.mongodb.net/links?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to db')
});

app.use(express.static(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.use(express.json())
app.use(cors())

const linksRouter = require('./routes/links')
// const categoriesRouter = require('.routes/categories')

app.use('/links', linksRouter)
// app.use('/categories', categoriesRouter)

app.listen(5500, () => console.log('Server running...'))