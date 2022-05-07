const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const bcrypt = require("bcryptjs");


exports.updateUser = asyncHandler(async (req, res, next) => {
    if (req.user.id === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return next(new ErrorResponse(err, 500))
            }
        }
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.status(200).json("Account has been updated");
    } else {
        return next(new ErrorResponse('You can only update your account', 404))
    }
})



exports.deleteUser = asyncHandler(async (req, res) => {
    if (req.user.id === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully!");
        } catch (err) {
            return next(new ErrorResponse(err, 500))
        }
    } else {
        return next(new ErrorResponse('You can delete only your account', 403))
    }
})


exports.getUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err)
    }
})


exports.followUser = asyncHandler(async (req, res, next) => {

    if (req.user.id !== req.params.id) {
        console.log(req.user.id)
        console.log(req.params.id)
        try {
            console.log("asdkjasdnkj")
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.user.id)
            if (!user.followers.includes(req.user.id)) {
                await user.updateOne({ $push: { followers: req.user.id } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json("User has been followed!")
            } else {
                next(new ErrorResponse('You already follow this User!', 403))
            }
        } catch (err) {
            next(new ErrorResponse(err, 500))
        }

    } else {
        next(new ErrorResponse("You can't follow yourself!", 403))
    }
})



exports.unfollowUser = asyncHandler(async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.user.id)
            if (user.followers.includes(req.user.id)) {
                await user.updateOne({ $pull: { followers: req.user.id } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json("User has been unfollowed!")
            } else {
                next(new ErrorResponse("You don't follow this User!", 403))
            }
        } catch (err) {
            next(new ErrorResponse(err, 500))
        }

    } else {
        next(new ErrorResponse("You can't unfollow yourself!", 403))
    }
})