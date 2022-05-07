const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a Name'],
        min: 5,
        max: 60
    },
    email: {
        type: String,
        required: [true, 'Please add an Email'],
        unique: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please add a valid Email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a Password'],
        min: 20,
        select: false
    },
    currentYear: {
        type: String,
    },
    hostelNumber: {
        type: String,
    },
    roomNumber: {
        type: Number,
    },
    aboutMe: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: Number,
        default: ''
    },
    profilePicture: {
        type: String,
        default: ''
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 60
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true })


// Encrypt password before saving the user in the database


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})


//Sign JWT and return 
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Match user entered password to hashed password in database

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// Generate and hash password
userSchema.methods.getResetPasswordToken = function () {
    // Generate Token
    const resetToken = crypto.randomBytes(20).toString('hex')
    // Hash Token and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // Set expire
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;


}

module.exports = mongoose.model('User', userSchema)