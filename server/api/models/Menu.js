const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema Object For Menu Items
const menuSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures the price is non-negative
  },
  eventLocation: {
    type: String,
    required: true, // Ensures the location is provided
    trim: true,
  },
  eventDateTime: {
    type: Date, // Field for date and time of the event
    required: true, // Ensures an event date and time is provided
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Model
const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
