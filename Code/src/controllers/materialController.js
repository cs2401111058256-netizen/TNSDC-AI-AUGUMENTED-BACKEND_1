const Material = require('../models/materialModel');
const fs = require('fs');

// Create Material Controller
exports.createMaterial = async (req, res) => {
  try {
    const { title } = req.body;
    let content = req.body.content;

    // Multer vachi file upload panniruntha, antha file-la irukra text-ai read pannikum
    if (req.file) {
      content = fs.readFileSync(req.file.path, 'utf8');
    }

    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Title and content are required" });
    }

    const newMaterial = new Material({
      title,
      content,
      user: req.user ? req.user.userId : undefined
    });

    await newMaterial.save();

    res.status(201).json({
      success: true,
      message: "Material created successfully",
      material: newMaterial
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Materials Controller
exports.getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: materials.length,
      materials
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};