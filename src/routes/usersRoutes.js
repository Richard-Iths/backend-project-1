const { Router } = require("express");
const usersController = require("../controllers/usersController");

const router = Router();

router.post("/login", usersController.postLogin);

module.exports = router;
