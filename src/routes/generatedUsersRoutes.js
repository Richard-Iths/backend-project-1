const { Router } = require("express");
const generateUsersController = require("../controllers/generatedUsersController");
const authMiddleware = require("../middlewares/auth");
const throttlingMiddleware = require("../middlewares/throttling");

const router = Router();
router.get(
  "/generated",
  authMiddleware,
  throttlingMiddleware.generatedUsersLimit,
  generateUsersController.getGeneratedUser
);

module.exports = router;
