import asyncHandler from "../middlewares/asyncHandler.js";
import Item from "../models/ItemSchema.js";
import LoanRequest from "../models/LoanSchema.js";

export const addItem = asyncHandler(async (req, res) => {
  try {
    if (!req.body.itemId) {
      return res.status(400).send({ message: "Item ID is required!" });
    }

    const newitem = {
      itemId: req.body.itemId,
      handlingMethos: req.body.handlingMethos,

      description: req.body.description,
      availability: req.body.availability,
      borrowedBy: req.body.borrowedBy,
      manualUrl: req.body.manualUrl,
      categoryTest: req.body.categoryTest,
    };
    const item = await Item.create(newitem);
    return res.status(200).send(item);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export const updateItem = asyncHandler(async (req, res) => {
  try {
    if (!req.body.itemId) {
      return res.status(400).send({
        message: "Send all required field :brand, mode",
      });
    }
    const { id } = req.params;

    const result = await Item.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(400).send({ message: "Item not found" });
    }
    return res.status(200).send({ message: "Item updated sucessfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export const removeItem = asyncHandler(async (req, res) => {
  try {
    const itemId = req.params.id;

    // Delete the item and all associated loan requests
    await Promise.all([
      Item.findByIdAndDelete(itemId), // Delete the item
      LoanRequest.deleteMany({ itemId }), // Delete associated loan requests
    ]);

    res.json({
      message: "Item and associated loan requests deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export const fetchItem = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find({}).populate("categoryTest");
    res.send(items);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Server error" });
  }
});

export const getItemById = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) {
      return res.json(item);
    } else {
      res.status(404);
      throw new Error("Item not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Item not found" });
  }
});

export const getPhoto = asyncHandler(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).select("photo");
    if (item.photo.data) {
      res.set("contentType", item.photo.contentType);
      return res.status(200).send(item.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while getting photo" });
  }
});

export const getItemsByCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.categoryTest;
    const items = await Item.find({ categoryTest: categoryId }).populate(
      "categoryTest"
    );
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while getting items" });
  }
});

export const searchItem = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    let item;

    if (query) {
      item = await Item.find({
        name: { $regex: query, $options: "i" },
      });
    } else {
      item = await Item.find().sort({ name: 1 });
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
