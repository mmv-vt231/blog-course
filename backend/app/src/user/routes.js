const express = require("express");
const controller = require('./controller/index');

const router = express.Router();

router.post("/signup", (req, res) => {
    controller.createUser(req, res);
})

router.get("/", (req, res) => {
    controller.getUserList(req, res);
})

router.get("/:id", (req, res) => {
    controller.getUser(req, res);
})


router.put("/:id", (req, res) => {
    controller.updateUser(req, res);
})

router.delete("/:id", (req, res) => {
    controller.deleteUser(req, res);
})

module.exports = router;