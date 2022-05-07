const router = require('express').Router();
const { getAds, getAd, createAd, updateAd, deleteAd, likeAd } = require('../controllers/Ads');
const { protect } = require('../middlewares/Auth');

router
    .route('/')
    .get(getAds)
    .post(protect, createAd)

router
    .route('/:id')
    .get(getAd)
    .put(protect, updateAd)
    .delete(protect, deleteAd)

router.put("/:id/like", protect, likeAd);

module.exports = router