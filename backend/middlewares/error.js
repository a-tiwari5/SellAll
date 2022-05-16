const ErrorResponse = require("../utils/errorResponse");

const errorHandler = async (err, req, res, next) => {
    let error = { ...err }

    error.message = err.message
    // Log to console for dev
    console.log(err.name)

    // Mongoose Bad Object Id
    if (err.name === "CastError") {
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404)
    }

    // Mongoose Duplicate Key
    if (err.code === 1100) {
        const message = 'Duplicate field value entered'
        error = new ErrorResponse(message, 400)
    }

    //Mongoose Validatation Error
    if (err.name === '') {
        const message = Object.values(err.errors).map(val => val.message)
        err = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    })
}


module.exports = errorHandler