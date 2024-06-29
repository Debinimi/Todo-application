const mongoose = require('mongoose')

async function connectToDatabase(){
    try {
        await mongoose.connect("mongodb+srv://debinimi3:debinimi3@cluster0.hjxthvv.mongodb.net/Todo?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Database connected")               
    } catch (error) {   
        console.log(error)
    }
}

module.exports = connectToDatabase;