const express = require("express");
const controller = require('./controller/index');

const router = express.Router();

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.getCommentList(req, res);
})

router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.getComment(req, res);
})

router.get("/:id/replies", (req, res) => {
    controller.getReplies(req, res);
})

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.createComment(req, res);
})

router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.updateComment(req, res);
})

router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.deleteComment(req, res);
})

module.exports = router;