//require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const secretKey = 'rubicamp'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 100
    },

    token: String
}, 
{
    timestamps: true
})

userSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, saltRounds);
        this.password = hashedPassword
        console.log('password succersfully hashed')
        next()
    } catch (error) {
        console.log(error)
    }
});

userSchema.methods.comparePassword = async function (password, check) {
    const result = await bcrypt.compare(password, this.password)
    check(result)
}

module.exports = mongoose.model('User', userSchema);