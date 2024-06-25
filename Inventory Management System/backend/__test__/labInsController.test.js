import {
    updateInstructor,
    deleteInstructor,
    getSingleInstructor,
    getAllInstuctor,
    getInstructorProfile,
  } from "../controllers/instructorController";
  import LabIns from "../models/LabInstructSchema"; // Import the LabIns model

  // Mock the LabIns model
  jest.mock("../models/LabInstructSchema", () => ({
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findById: jest.fn(),
    find: jest.fn(),
  }));

  describe("Instructor Controller", () => {
    afterEach(() => {
      jest.clearAllMocks(); // Clear mock calls after each test
    });

    describe("updateInstructor", () => {
      it("should update instructor successfully", async () => {
        const mockReq = {
          params: { id: "mockInstructorId" },
          body: { /* mock request body */ },
        };
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        LabIns.findByIdAndUpdate.mockResolvedValueOnce(/* mocked updated instructor */);

        await updateInstructor(mockReq, mockRes);

        expect(LabIns.findByIdAndUpdate).toHaveBeenCalledWith(
          "mockInstructorId",
          { $set: mockReq.body },
          { new: true }
        );
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
          success: true,
          message: "Successfully updated",
          data: /* mocked updated instructor */,
        });
      });

      it("should handle update instructor failure", async () => {
        const mockReq = { params: { id: "mockInstructorId" }, body: {} };
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };

        LabIns.findByIdAndUpdate.mockRejectedValueOnce(/* mock error */);

        await updateInstructor(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
          success: false,
          message: "Failed to update",
        });
      });
    });

    
  });

// test("Instructor contolls", () => {
//   expect(2 + 2).toBe(4);
// });
