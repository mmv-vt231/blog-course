const express = require("express");
const passport = require("passport");

const controller = require('./controller/index');

const router = express.Router();

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.getTagList(req, res);
})

router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.getTag(req, res);
})

router.get("/posts", (req, res) => {
    controller.getPosts(req, res);
})

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.createTag(req, res);
})

router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.updateTag(req, res);
})

router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.deleteTag(req, res);
})

module.exports = router;