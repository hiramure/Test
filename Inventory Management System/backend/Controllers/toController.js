import TechOfficer from "../models/TOSchema.js";

export const updateTechOfficer = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTechOfficer = await TechOfficer.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateTechOfficer,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteTechOfficer = async (req, res) => {
  const id = req.params.id;
  try {
    await TechOfficer.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete the technical officer",
    });
  }
};

export const getSingleTechOfficer = async (req, res) => {
  const id = req.params.id;
  try {
    const techOfficer = await TechOfficer.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Technical Officer Found",
      data: techOfficer,
    });
  } catch (err) {
    res
      .status(404)
      .json({ success: false, message: "No technical officer found" });
  }
};

export const getAllTechOfficer = async (req, res) => {
  try {
    const techOfficers = await TechOfficer.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Technical Officers Found",
      data: techOfficers,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getTechOfficerProfile = async (req, res) => {
  const techOfficerId = req.userID;

  try {
    const techOfficer = await TechOfficer.findById(techOfficerId);
    if (!techOfficer) {
      return res.status(404).json({
        success: false,
        message: "Technical Officer not found",
        data: { techOfficerId },
      });
    }
    const { password, ...rest } = techOfficer._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    console.error("Error fetching technical officer profile:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the profile",
    });
  }
};
