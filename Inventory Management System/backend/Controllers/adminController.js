import Admin from "../models/AdminSchema.js";

export const updateAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateAdmin,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    await Admin.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleAdmin = async (req, res) => {
  const id = req.params.id;
  try {
    const admin = await Admin.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "Admin Found",
      data: admin,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "No admin found" });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Admins Found",
      data: admins,
    });
  } catch (err) {
    res.status(404).json({ success: false, message: "Not found" });
  }
};

export const getAdminProfile = async (req, res) => {
  const adminId = req.userID;
  try {
    const admin = await Admin.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }
    const { password, ...rest } = admin._doc;
    res.status(200).json({
      success: true,
      message: "Profile info is getting",
      data: { ...rest },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
