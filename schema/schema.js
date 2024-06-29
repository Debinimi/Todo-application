const mongoose = require('mongoose')
const { signupSchema } = require('./signupSchema')

const TodoSchema = mongoose.Schema(
    {
        title:String,
        description:String
    },
    {
        timestamps:true
    }
)

const todo = mongoose.model('Task', TodoSchema)


const user = mongoose.model('user-details', signupSchema)

module.exports = {user,todo};