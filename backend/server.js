const express = require('express')
const dotenv = require('dotenv')
const app = express();
const morgan = require('morgan')
const colors = require('colors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/error')


dotenv.config()
const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected : ${conn.connection.host}`)
}
connectDB();

// Route files
const adsRoutes = require('./routes/Ads')
const authRoutes = require('./routes/Auth')
const userRoutes = require('./routes/Users')
app.use(express.json())

app.use(cookieParser())

// Dev logging Middleware

app.use(morgan('common'))

// Mount Routes

app.use('/api/v1/ads', adsRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server is running on port 8000".yellow.bold)
})


// process.on('unhandledRejection', (err, promise) => {
//     console.log(`Error :${err.message}`);
//     server.close(() => process.exit(1))
// })