const express = require("express");
const UserController = require("../controllers/controller");

const router = express.Router();
router.get("/", UserController.findAll);
router.post("/", UserController.create);
router.put("/", UserController.updateUser);
router.delete("/", UserController.deleteUser);

module.exports = router;
