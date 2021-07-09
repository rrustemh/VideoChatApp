const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const EmailController = require('../controllers/EmailController');
router.post('/email', EmailController.sendEmail)
router.get("/video", UserController.getVideo);
module.exports = router;
