const express = require('express');
const router = express.Router();
const { createMaterial, getMaterials } = require('../controllers/materialController');
const upload = require('../middleware/upload'); // Multer middleware-ai import panrathu

// Inga '/' ku bathila '/upload' potrukom
router.post('/upload', upload.single('file'), createMaterial);
router.get('/', getMaterials);

module.exports = router;