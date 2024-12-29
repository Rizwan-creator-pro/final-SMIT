const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// POST route to create a new review
router.post('/', async (req, res) => {
  const { rating, feedback } = req.body;

  try {
    const newReview = new Review({ rating, feedback });
    await newReview.save(); // Save the review to the database
    res.status(201).json({ message: 'Review submitted successfully!', review: newReview });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Error saving review', error: error.message });
  }
});

// GET route to fetch all reviews (optional)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find(); // Fetch all reviews from the database
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

module.exports = router;
