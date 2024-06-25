import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import LabIns from "../models/LabInstructSchema.js";
import { register, login } from "../Controllers/authController.js";

jest.mock("../models/LabInstructSchema.js");
jest.mock("../models/TOSchema.js");
jest.mock("../models/AdminSchema.js");

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe("Authentication Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("register function", () => {
    it("should register a new user successfully", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
          username: "testuser",
          role: "labInstructor",
          phone: "1234567890",
          //   photo: "test.jpg",
          firstName: "John",
          lastName: "Doe",
        },
      };
      const mockSave = jest.fn();
      LabIns.findOne.mockResolvedValue(null);
      LabIns.mockImplementationOnce(() => ({
        save: mockSave,
      }));

      await register(req, { status: jest.fn(), json: jest.fn() });

      expect(LabIns.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe("login function", () => {
    it("should login a user successfully", async () => {
      const req = {
        body: {
          email: "test@example.com",
          password: "password123",
        },
      };
      const mockUser = {
        _doc: {
          email: req.body.email,
          password: "hashedPassword",
          role: "labInstructor",
          username: "testuser",
        },
      };
      LabIns.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mockToken");

      const mockResponse = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await login(req, mockResponse);

      expect(LabIns.findOne).toHaveBeenCalledWith({ email: req.body.email });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        req.body.password,
        mockUser._doc.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: expect.any(String), role: mockUser._doc.role },
        expect.any(String),
        { expiresIn: "15d" }
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: true,
        message: "Successfully login",
        token: "mockToken",
        data: { email: mockUser._doc.email },
        role: mockUser._doc.role,
      });
    });
  });
});

// test("Auth controller ", () => {
//   expect(2 + 2).toBe(4);
// });
