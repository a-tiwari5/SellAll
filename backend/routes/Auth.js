const router = require('express').Router();
const { register, login, getMe, forgotPassword, resetPassoword } = require('../controllers/Auth');
const { protect } = require('../middlewares/Auth');


router.post('/register', register)
router.post('/login', login)
router.get('/me', protect, getMe)
router.post('/forgetPassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassoword)




module.exports = router