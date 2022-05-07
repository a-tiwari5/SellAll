const mongoose = require('mongoose')
const slugify = require('slugify')

const AdSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    slug: String,
    desc: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique: true,
        maxlength: 20
    },
    price: {
        type: Number,
        required: true
    },
    imgs: {
        type: Array,
        default: []
    },
    likes: {
        type: Array,
        default: []
    },
    category: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be atleast 1'],
        max: [10, 'Rating must be atleast 5']
    }
}, { timestamps: true })


// Create ad slug from the title
AdSchema.pre('save', function (next) {
    this.slug = slugify(this.title, { lower: true })
    next();
})


module.exports = mongoose.model('Ad', AdSchema)