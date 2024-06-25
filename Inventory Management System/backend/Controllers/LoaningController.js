import asyncHandler from "../middlewares/asyncHandler.js";
import LoanRequest from "../models/LoanSchema.js";

// Create a new loan request
export const createRequest = asyncHandler(async (req, res) => {
  try {
    const newRequest = {
      requestFrom: req.body.requestFrom,
      itemId: req.body.itemId,
      burrowDate: req.body.burrowDate,
      returnDate: req.body.returnDate,
      requestStatus: req.body.requestStatus,
      purpose: req.body.purpose,
    };
    const loanRequest = await LoanRequest.create(newRequest);
    return res.status(200).send(loanRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

// Update an existing loan request
export const updateRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRequest = await LoanRequest.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
});

// Remove a loan request
export const removeRequest = asyncHandler(async (req, res) => {
  try {
    const request = await LoanRequest.findByIdAndDelete(req.params.id);
    res.json(request);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Server error" });
  }
});

// Get a loan request by ID
export const getRequestById = asyncHandler(async (req, res) => {
  try {
    const request = await LoanRequest.findById(req.params.id);
    if (request) {
      return res.json(request);
    } else {
      res.status(404);
      throw new Error("Request not found");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Request not found" });
  }
});

// Get loan requests by user
export const getRequestByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.params.requestFrom;
    const requests = await LoanRequest.find({ requestFrom: userId })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate("requestFrom")
      .populate("itemId");
    res.json(requests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error while getting requests." });
  }
});

// Fetch all loan requests
export const fetchRequest = asyncHandler(async (req, res) => {
  try {
    const loanRequest = await LoanRequest.find({}).populate("itemId");
    res.send(loanRequest);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Server error" });
  }
});
