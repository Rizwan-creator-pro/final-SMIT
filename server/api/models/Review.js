const mongoose = require("mongoose");
const { Schema } = mongoose;


const reviewSchema = new Schema({
  rating: {
    type: String,
    required: true,
    enum: ['poor', 'bad', 'average', 'good', 'excellent'], // Acceptable rating values
  },
  feedback: {
    type: String,
    required: true,
    maxlength: 500, // Limit feedback to 500 characters
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;