const router = require('express').Router();
const { register, login, getMe, forgotPassword, resetPassoword, logout } = require('../controllers/Auth');
const { protect } = require('../middlewares/Auth');


router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/forgetPassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassoword)
router.get('/logout', protect, logout)




module.exports = router