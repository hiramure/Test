import {
  addItem,
  updateItem,
  removeItem,
  fetchItem,
  getItemById,
  getPhoto,
  getItemsByCategory,
} from "../Controllers/itemController.js";
import Item from "../models/ItemSchema.js";
import LoanRequest from "../models/LoanSchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Mock Item and LoanRequest models
jest.mock("../models/ItemSchema.js");
jest.mock("../models/LoanSchema.js");

describe("Item Controller", () => {
  describe("addItem", () => {
    it("should add a new item", async () => {
      const req = {
        body: {
          itemId: "123",
          handlingMethos: "handling method",
          category: "category",
          description: "description",
          availability: true,
          borrowedBy: "borrowed by",
          manualUrl: "manual url",
          categoryTest: "category test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await addItem(req, res);

      expect(Item.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalled();
    });

    it("should return an error if itemId is missing", async () => {
      const req = {
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await addItem(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Item ID is required!",
      });
    });
  });

  describe("updateItem", () => {
    it("should update an existing item", async () => {
      const req = {
        body: { itemId: "123" },
        params: { id: "itemId" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateItem(req, res);

      expect(Item.findByIdAndUpdate).toHaveBeenCalledWith("itemId", req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: "Item updated successfully",
      });
    });

    it("should return an error if itemId is missing", async () => {
      const req = {
        body: {},
        params: { id: "itemId" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await updateItem(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({
        message: "Send all required fields: brand, mode",
      });
    });

    // Add more test cases as needed
  });

  describe("removeItem", () => {
    it("should remove an existing item and associated loan requests", async () => {
      const req = {
        params: { id: "itemId" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Item.findByIdAndDelete.mockResolvedValue({});
      LoanRequest.deleteMany.mockResolvedValue({});

      await removeItem(req, res);

      expect(Item.findByIdAndDelete).toHaveBeenCalledWith("itemId");
      expect(LoanRequest.deleteMany).toHaveBeenCalledWith({ itemId: "itemId" });
      expect(res.json).toHaveBeenCalledWith({
        message: "Item and associated loan requests deleted successfully",
      });
    });

    it("should return an error if an error occurs", async () => {
      const req = {
        params: { id: "itemId" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Item.findByIdAndDelete.mockRejectedValue(
        new Error("Failed to delete item")
      );

      await removeItem(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
    });
  });

  describe("fetchItem", () => {
    it("should fetch all items", async () => {
      const req = {};
      const res = {
        send: jest.fn(),
      };

      const items = [{ name: "Item 1" }, { name: "Item 2" }];
      Item.find.mockResolvedValue(items);

      await fetchItem(req, res);

      expect(res.send).toHaveBeenCalledWith(items);
    });

    it("should return an error if fetching items fails", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Item.find.mockRejectedValue(new Error("Failed to fetch items"));

      await fetchItem(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
    });
  });
});

// test("Item Controlls", () => {
//   expect(2 + 2).toBe(4);
// });
