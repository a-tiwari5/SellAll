const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const { sendEmail } = require('../utils/sendMail')
const crypto = require('crypto')


// @desc   Register a User
// @route  POST /api/v1/auth/register
// @access PUBLIC


exports.register = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body)

    // Create a token
    sendTokenResponse(user, 200, res)
})

// @desc   Login a User
// @route  POST /api/v1/auth/login
// @access PUBLIC

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Vaidate email and password
    if (!email || !password) {
        return next(new ErrorResponse('Please Provide an Email or Password'), 400)
    }

    // Check for User
    const user = await User.findOne({ email: email }).select('+password')

    if (!user) {
        return next(new ErrorResponse('Invalid Credentials', 401))
    }

    // Check if passoword matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Create a token
    sendTokenResponse(user, 200, res)
})


// Get current user via token
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({ success: true, data: user })
})



// Forget Password Route
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorResponse('There is no user with that email', 404))
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false })
    const url = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`

    try {
        await sendEmail(user.email, url, "Reset your password")
        res.status(200).json({ success: true, msg: 'Re-send the password,please check your email.' })
    } catch (err) {
        console.log(err)
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorResponse('Email could not be sent', 500))
    }
})












// @desc   Reset Password
// @route  PUT /api/v1/auth/resetpassword/:resetToken
// @access Public

exports.resetPassoword = asyncHandler(async (req, res, next) => {
    const resetPassowordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')
    const user = await User.findOne({
        resetPassowordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorResponse('Invalid Token', 400))
    }

    // Set the password
    user.password = req.body.password
    user.resetPassowordToken = undefined;
    user.resetPassowordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res)


})


// @desc   Log User Out
// @route  GET /api/v1/auth/logout
// @access Private


exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        data: {}
    })
})




// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create a token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    if (process.env.NODE_ENV === "production") {
        options.secure = true
    }
    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            user: user,
            token: token
        })
}