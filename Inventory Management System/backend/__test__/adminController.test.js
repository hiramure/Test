import {
  updateAdmin,
  deleteAdmin,
  getSingleAdmin,
  getAllAdmin,
  getAdminProfile,
} from "../Controllers/adminController.js";
import Admin from "../models/AdminSchema";

jest.mock("../models/AdminSchema");

describe("Admin Controller Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updateAdmin function", () => {
    it("should update an admin successfully", async () => {
      const req = {
        params: { id: "adminId" },
        body: {},
      };
      const mockUpdatedAdmin = {};
      Admin.findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedAdmin);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await updateAdmin(req, mockResponse);

      expect(Admin.findByIdAndUpdate).toHaveBeenCalledWith(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Successfully updated",
        data: mockUpdatedAdmin,
      });
    });
  });

  describe("deleteAdmin function", () => {
    it("should delete an admin successfully", async () => {
      const req = { params: { id: "adminId" } };
      Admin.findByIdAndDelete.mockResolvedValueOnce();

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await deleteAdmin(req, mockResponse);

      expect(Admin.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Successfully deleted",
      });
    });
  });

  describe("getSingleAdmin function", () => {
    it("should get a single admin successfully", async () => {
      const req = { params: { id: "adminId" } };
      const mockAdmin = {};
      Admin.findById.mockResolvedValueOnce(mockAdmin);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getSingleAdmin(req, mockResponse);

      expect(Admin.findById).toHaveBeenCalledWith(req.params.id);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Admin Found",
        data: mockAdmin,
      });
    });
  });

  describe("getAllAdmin function", () => {
    it("should get all admins successfully", async () => {
      const mockAdmins = [];
      Admin.find.mockResolvedValueOnce(mockAdmins);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllAdmin({}, mockResponse);

      expect(Admin.find).toHaveBeenCalledWith({});
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Admins Found",
        data: mockAdmins,
      });
    });
  });

  describe("getAdminProfile function", () => {
    it("should get admin profile successfully", async () => {
      const req = { userId: "adminId" };
      const mockAdmin = {};
      Admin.findById.mockResolvedValueOnce(mockAdmin);

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAdminProfile(req, mockResponse);

      expect(Admin.findById).toHaveBeenCalledWith(req.userId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: "Profile info is getting",
        data: expect.objectContaining({}),
      });
    });
  });
});

// test("Admin controlls", () => {
//   expect(2 + 2).toBe(4);
// });
