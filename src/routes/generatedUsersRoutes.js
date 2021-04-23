const { Router } = require("express");
const generateUsersController = require("../controllers/generatedUsersController");
const authMiddleware = require("../middlewares/auth");

const router = Router();
router.get(
  "/generated",
  authMiddleware,
  generateUsersController.getGeneratedUser
);
router.get(
  "/generated/:link",
  authMiddleware,
  generateUsersController.getSharedUser
);

module.exports = router;
