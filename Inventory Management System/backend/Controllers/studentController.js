import Student from "../models/StudentSchema.js";

export const updateStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateStudent,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteStudent = async (req, res) => {
  const id = req.params.id;
  try {
    await Student.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleStudent = async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Student.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Student Found",
      data: student,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No admin found" });
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Students Found",
      data: students,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};
