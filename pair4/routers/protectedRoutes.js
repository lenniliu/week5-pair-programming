const express = require('express');
const router = express.Router();
const protectedRoute = require('../controllers/protectedRoute');
const { requireAuth } = require("../middleware/requireAuth")

router.get('/protected', requireAuth, protectedRoute);

module.exports = router;
