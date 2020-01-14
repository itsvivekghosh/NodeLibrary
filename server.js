
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
}
const express = require('express');
const app = express();
const expresslayout = require("express-ejs-layouts");
const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expresslayout);
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', function (err) {
    console.error("connection error;", err);
});
db.once('open', () => {
    console.log("Connected to Mongoose Database")
})
app.use('/', indexRouter)
app.listen(process.env.PORT || 3000);
