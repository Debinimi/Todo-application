const express = require('express')
const mongoose = require('mongoose')
const connectToDatabase = require('./database/db')
const router = require('./routes/routes')
const cors = require('cors')

const port = 3000
const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req,res) => {
    res.send("Hello world")
})
app.use(router)

app.listen(port, () => {
    connectToDatabase();
    console.log(`Server is running on port ${port}`);
})
