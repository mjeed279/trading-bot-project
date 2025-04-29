const express = require("express");
const settingsController = require("../controllers/settingsController");

const router = express.Router();

// Route to save API keys
router.post("/keys", settingsController.saveApiKeys);

// Add other settings routes here if needed

module.exports = router;

