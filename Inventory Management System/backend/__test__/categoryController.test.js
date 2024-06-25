import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../Controllers/CatogaryController.js";
import Category from "../models/CategorySchema.js";

// Mock Category model methods
jest.mock("../models/CategorySchema.js");

describe("Category Controller", () => {
  describe("createCategory", () => {
    it("should create a new category", async () => {
      const req = {
        body: { name: "Test Category" },
      };
      const res = {
        json: jest.fn(),
      };

      await createCategory(req, res);

      expect(Category.findOne).toHaveBeenCalledWith({ name: "Test Category" });
      expect(Category.prototype.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });

    it("should return an error if name is missing", async () => {
      const req = {
        body: {},
      };
      const res = {
        json: jest.fn(),
      };

      await createCategory(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: "Name is required" });
    });

    it("should return an error if category already exists", async () => {
      const req = {
        body: { name: "Existing Category" },
      };
      const res = {
        json: jest.fn(),
      };

      // Mocking Category.findOne to return a value
      Category.findOne.mockResolvedValue({});

      await createCategory(req, res);

      expect(res.json).toHaveBeenCalledWith({
        error: "Category already exists",
      });
    });
  });

  describe("updateCategory", () => {
    it("should update an existing category", async () => {
      const req = {
        body: { name: "Updated Category" },
        params: { categoryId: "existingCategoryId" },
      };
      const res = {
        json: jest.fn(),
      };

      Category.findOne.mockResolvedValue({});

      await updateCategory(req, res);

      expect(Category.findOne).toHaveBeenCalledWith({
        _id: "existingCategoryId",
      });
      expect(res.json).toHaveBeenCalled();
    });

    it("should return an error if category is not found", async () => {
      const req = {
        params: { categoryId: "nonexistentCategoryId" },
      };
      const res = {
        json: jest.fn(),
      };

      Category.findOne.mockResolvedValue(null);

      await updateCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Category not found" });
    });
  });

  describe("removeCategory", () => {
    it("should remove an existing category", async () => {
      const req = {
        params: { categoryId: "existingCategoryId" },
      };
      const res = {
        json: jest.fn(),
      };

      Category.findByIdAndDelete.mockResolvedValue({
        name: "Deleted Category",
      });

      await removeCategory(req, res);

      expect(Category.findByIdAndDelete).toHaveBeenCalledWith(
        "existingCategoryId"
      );
      expect(res.json).toHaveBeenCalledWith("Deleted Category");
    });

    it("should return an error if category is not found", async () => {
      const req = {
        params: { categoryId: "nonexistentCategoryId" },
      };
      const res = {
        json: jest.fn(),
      };

      Category.findByIdAndDelete.mockResolvedValue(null);

      await removeCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Internal server error" });
    });
  });

  describe("listCategory", () => {
    it("should list all categories", async () => {
      const req = {};
      const res = {
        send: jest.fn(),
      };

      const categories = [{ name: "Category 1" }, { name: "Category 2" }];
      Category.find.mockResolvedValue(categories);

      await listCategory(req, res);

      expect(res.send).toHaveBeenCalledWith(categories);
    });

    it("should return an error if listing categories fails", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Category.find.mockRejectedValue(new Error("Failed to list categories"));

      await listCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("Failed to list categories");
    });
  });

  describe("readCategory", () => {
    it("should read a category by ID", async () => {
      const req = {
        params: { id: "categoryId" },
      };
      const res = {
        json: jest.fn(),
      };

      const category = { name: "Category" };
      Category.findOne.mockResolvedValue(category);

      await readCategory(req, res);

      expect(Category.findOne).toHaveBeenCalledWith({ _id: "categoryId" });
      expect(res.json).toHaveBeenCalledWith(category);
    });

    it("should return an error if category is not found", async () => {
      const req = {
        params: { id: "nonexistentCategoryId" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Category.findOne.mockResolvedValue(null);

      await readCategory(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("No category found");
    });
  });
});

// test("Category Controlls", () => {
//   expect(2 + 2).toBe(4);
// });
