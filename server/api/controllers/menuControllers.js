const Menu = require("../models/Menu");

// Get all menu items (with optional date filtering and sorting)
const getAllMenuItems = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Create a filter for date range if provided
    const dateFilter = {};
    if (startDate) {
      dateFilter.eventDateTime = { $gte: new Date(startDate) };
    }
    if (endDate) {
      dateFilter.eventDateTime = { ...dateFilter.eventDateTime, $lte: new Date(endDate) };
    }

    const menus = await Menu.find(dateFilter).sort({ eventDateTime: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Post a new menu item
const postMenuItem = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Menu.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const deletedItem = await Menu.findByIdAndDelete(menuId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Menu not found" });
    }
    res.status(200).json({ message: "Menu Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single menu item
const singleMenuItem = async (req, res) => {
  const menuId = req.params.id;
  try {
    const menu = await Menu.findById(menuId);
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a single menu item
const updateMenuItem = async (req, res) => {
  const menuId = req.params.id;
  const { name, recipe, image, category, price, eventLocation, eventDateTime } = req.body; // Updated field
  try {
    const updatedMenu = await Menu.findByIdAndUpdate(
      menuId,
      { name, recipe, image, category, price, eventLocation, eventDateTime }, // Updated field
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuItems,
  postMenuItem,
  deleteMenuItem,
  singleMenuItem,
  updateMenuItem,
};
