const { Router } = require("express");
const generateUsersController = require("../controllers/generatedUsersController");
const authMiddleware = require("../middlewares/auth");

const router = Router();
router.get("/generated", generateUsersController.getGeneratedUser);

module.exports = router;
