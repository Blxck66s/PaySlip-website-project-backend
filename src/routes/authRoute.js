const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const auth = require("../middlewares/auth");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/", auth, authController.getUser);

module.exports = router;
