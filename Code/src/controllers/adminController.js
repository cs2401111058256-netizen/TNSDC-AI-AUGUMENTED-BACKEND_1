const Material = require('../models/materialModel');
const User = require('../models/User');

// Get All Admin Stats / Overview Controller
exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMaterials = await Material.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalMaterials
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Users for Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};