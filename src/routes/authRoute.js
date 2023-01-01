const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const adminAuth = require("../middlewares/adminAuth");
const auth = require("../middlewares/auth");

router.post("/register", adminAuth, authController.register);
router.post("/login", authController.login);
router.get("/", auth, authController.getUser);

module.exports = router;
