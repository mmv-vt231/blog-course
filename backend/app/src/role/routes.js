const express = require("express");
const controller = require('./controller/index');

const router = express.Router();

router.get("/", (req, res) => {
    controller.getPostList(req, res);
})

router.get("/:id", (req, res) => {
    controller.getPost(req, res);
})

router.post("/", (req, res) => {
    controller.createPost(req, res);
})

router.put("/:id", (req, res) => {
    controller.updatePost(req, res);
})

router.delete("/:id", (req, res) => {
    controller.deletePost(req, res);
})

module.exports = router;