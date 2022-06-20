const express = require('express')
const app = express()
const dotenv = require('dotenv/config')
const routes = require('./routes/router')
const db = require('./utils/db')
const bodyParser = require("body-parser");

const PORT = 8080

db.connect()

//middlewares
app.use(bodyParser.json());
app.use(routes)

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})