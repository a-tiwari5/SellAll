const router = require("express").Router();
const { updateUser, deleteUser, getUser, followUser, unfollowUser } = require("../controllers/Users")
const { protect } = require('../middlewares/Auth')


//follow a user

router.put('/:id/follow', protect, followUser)

//unfollow a user

router.put('/:id/unfollow', protect, unfollowUser)


//updateUser
router.put("/:id", protect, updateUser);

//deleteUser

router.delete("/:id", protect, deleteUser);

//getAUser
router.get('/:id', protect, getUser)




module.exports = router;
