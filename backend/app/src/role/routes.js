const express = require("express");
const controller = require('./controller/index');

const router = express.Router();

router.get("/", (req, res) => {
    controller.getRoleList(req, res);
})

router.get("/:id", (req, res) => {
    controller.getRole(req, res);
})

router.post("/", (req, res) => {
    controller.createRole(req, res);
})

router.put("/:id", (req, res) => {
    controller.updateRole(req, res);
})

router.delete("/:id", (req, res) => {
    controller.deleteRole(req, res);
})

module.exports = router;