const express = require('express');
const router = express.Router();
const { getAdminStats, getAllUsers } = require('../controllers/adminController');

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);

module.exports = router;