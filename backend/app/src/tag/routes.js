const express = require("express");
const controller = require('./controller/index');

const router = express.Router();

router.get("/", (req, res) => {
    controller.getTagList(req, res);
})

router.get("/:id", (req, res) => {
    controller.getTag(req, res);
})

router.post("/", (req, res) => {
    controller.createTag(req, res);
})

router.put("/:id", (req, res) => {
    controller.updateTag(req, res);
})

router.delete("/:id", (req, res) => {
    controller.deleteTag(req, res);
})

module.exports = router;