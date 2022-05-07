const Ad = require('../models/Ad');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
// @desc   Get all Ads
// @route  GET /api/v1/ads
// @access Public
exports.getAds = asyncHandler(async (req, res, next) => {
    const Ads = await Ad.find();
    res.status(200).json({ success: true, count: Ads.length, data: Ads })
})


// @desc   Get a single Ads
// @route  GET /api/v1/ads/:id
// @access Private
exports.getAd = asyncHandler(async (req, res, next) => {
    const ad = await Ad.findById(req.params.id)
    if (!ad) {
        return next(new ErrorResponse(`Ad not found with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: ad })
})

// @desc   Post an Ad
// @route  POST /api/v1/ads/
// @access Private
exports.createAd = asyncHandler(async (req, res, next) => {
    const ad = await Ad.create({ userId: req.user.id, ...req.body })

    res.status(200).json({ success: true, data: ad })
})

// @desc   Update an Ad
// @route  PUT /api/v1/ads/:id
// @access Private
exports.updateAd = asyncHandler(async (req, res, next) => {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if (!ad) {
        return next(new ErrorResponse(`Ad not found with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, data: ad })
})

// @desc   Delete an Ad
// @route  delete /api/v1/ads/:id
// @access Private
exports.deleteAd = asyncHandler(async (req, res, next) => {
    const Ad = await Ad.findByIdAndDelete(req.params.id)
    if (!Ad) {
        return next(new ErrorResponse(`Ad not found with the id of ${req.params.id}`, 404))
    }
    res.status(200).json({ success: true, msg: "Ad deleted" })
})


exports.likeAd = asyncHandler(async (req, res, next) => {
    const ad = await Ad.findById(req.params.id);
    if (!ad.likes.includes.userId) {
        await ad.updateOne({ $push: { likes: req.user.id } });;
        res.status(200).json("The Ad has been liked")
    }
    else {
        await ad.updateOne({ $pull: { likes: req.user.id } })
        res.status(200).json("The Ad has been liked")
    }
})