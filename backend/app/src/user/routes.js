const express = require("express");
const passport = require("passport");

const controller = require('./controller/index');

const router = express.Router();

router.post("/signup", (req, res) => {
    controller.createUser(req, res);
})

router.post("/login", (req, res) => {
    controller.login(req, res);
})

router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.getUserList(req, res);
})

router.get("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.getUser(req, res);
})

router.post("/search", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.searchUser(req, res);
})

router.put("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.updateUser(req, res);
})

router.delete("/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.deleteUser(req, res);
})

module.exports = router;