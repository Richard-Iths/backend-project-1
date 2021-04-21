const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/auth");

const router = Router();
router.get("/user/me", authMiddleware, usersController.getUserProfile);
router.patch("/user/me", authMiddleware, usersController.patchUserProfile);
router.post("/user/login", usersController.postLogin);

module.exports = router;
