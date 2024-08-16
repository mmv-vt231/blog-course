const express = require("express");
const controller = require('./controller/index');

const router = express.Router();

router.get("/", (req, res) => {
    controller.getCommentList(req, res);
})

router.get("/:id", (req, res) => {
    controller.getComment(req, res);
})

router.post("/", (req, res) => {
    controller.createComment(req, res);
})

router.put("/:id", (req, res) => {
    controller.updateComment(req, res);
})

router.delete("/:id", (req, res) => {
    controller.deleteComment(req, res);
})

module.exports = router;