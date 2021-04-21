const { Router } = require("express");
const usersController = require("../controllers/usersController");
const authMiddleware = require("../middlewares/auth");

const router = Router();
router.get("/users/me", authMiddleware, usersController.getUserProfile);
router.patch("/users/me", authMiddleware, usersController.patchUserProfile);
router.post("/users/login", usersController.postLogin);

module.exports = router;
