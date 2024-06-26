import LabIns from "../models/LabInstructSchema.js";

export const updateInstructor = async (req, res) => {
  const id = req.params.id;
  try {
    const updateInstructor = await LabIns.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateInstructor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteInstructor = async (req, res) => {
  const id = req.params.id;
  try {
    await LabIns.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleInstructor = async (req, res) => {
  const id = req.params.id;
  try {
    const instructor = await LabIns.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Lab instructor Found",
      data: instructor,
    });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "Lab instructor not found" });
  }
};

export const getAllInstuctor = async (req, res) => {
  try {
    //Apply search
    const { query } = req.query;
    let instructors;

    if (query) {
      instructors = await LabIns.find({
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      instructors = await LabIns.find({}).select("-password");
    }

    //const instructors = await LabIns.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Lab instructors Found",
      data: instructors,
    });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "No any lab instructor found" });
  }
};

export const getInstructorProfile = async (req, res) => {
  const instructorId = req.userID;

  try {
    const instructor = await LabIns.findById(instructorId);
    if (!instructor) {
      return res
        .status(404)
        .json({ success: false, message: "Instructor not found" });
    }
    const { password, ...rest } = instructor._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong, can't find instructor",
    });
  }
};
