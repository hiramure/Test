import Category from "../models/CategorySchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import Item from "../models/ItemSchema.js";
import Loanings from "../models/LoanSchema.js";

export const createCategory = asyncHandler(async (req, res) => {
  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  try {
    let { name } = req.body;
    if (!name) {
      return res.json({ error: "Name is required" });
    }
    name = capitalizeWords(name);

    const existingCategory = await Category.findOne({ name: name });

    if (existingCategory) {
      return res.json({ error: "Category already exist" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).jsov(error);
  }
});

export const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internel server error" });
  }
});

// export const removeCategory = asyncHandler(async (req, res) => {
//   try {
//     const categoryTest = req.params.categoryId;

//     await Promise.all([
//       Category.findByIdAndDelete(categoryTest),
//       Item.deleteMany({ categoryTest }),
//     ]);

//     res.json({
//       message: "Category and associated items deleted",
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Internel server error" });
//   }
// });

export const removeCategory = asyncHandler(async (req, res) => {
  try {
    const categoryTest = req.params.categoryId;

    // Find all items associated with the category
    const items = await Item.find({ categoryTest });

    // Extract item IDs
    const itemIds = items.map((item) => item._id);

    // Delete all loan requests that reference these items
    await Loanings.deleteMany({ itemId: { $in: itemIds } });

    // Delete the items and the category
    await Promise.all([
      Category.findByIdAndDelete(categoryTest),
      Item.deleteMany({ categoryTest }),
    ]);

    res.json({
      message: "Category, associated items, and related loan requests deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const searchCategory = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    let category;

    if (query) {
      category = await Category.find({
        name: { $regex: query, $options: "i" },
      });
    } else {
      category = await Category.find().sort({ name: 1 });
    }
    res.status(200).json({
      success: true,
      message: "Category found",
      data: category,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export const listCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.find().sort({ name: 1 });
    res.send(category);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Server error" });
  }
});
