const mongoose = require('mongoose');

const signupSchema = mongoose.Schema(
    {
        fname: String,
        email: String,
        phone: Number,
        password: String
    }, {
    timestamps: true
}
);
exports.signupSchema = signupSchema;
