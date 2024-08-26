const express = require("express");
const passport = require("passport");

const controller = require('./controller/index');

const router = express.Router();

router.get("/", (req, res) => {
    controller.getPostList(req, res);
})

router.get("/:id", (req, res) => {
    controller.getPost(req, res);
})

router.get("/:id/comments", (req, res) => {
    controller.getComments(req, res);
})

router.get("/:id/related", (req, res) => {
    controller.getRelated(req, res);
})

router.post("/search", (req, res) => {
    controller.searchPost(req, res);
})

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.createPost(req, res);
})

router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.updatePost(req, res);
})

router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.deletePost(req, res);
})

module.exports = router;