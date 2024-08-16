const express = require("express");
const controller = require('./controller/index');

const router = express.Router();

router.get("/", (req, res) => {
    controller.getLikeList(req, res);
})

router.get("/:id", (req, res) => {
    controller.getLike(req, res);
})

router.post("/", (req, res) => {
    controller.createLike(req, res);
})

router.put("/:id", (req, res) => {
    controller.updateLike(req, res);
})

router.delete("/:id", (req, res) => {
    controller.deleteLike(req, res);
})

module.exports = router;