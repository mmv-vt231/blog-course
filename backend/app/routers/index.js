const post = require("../src/post/routes");
const tag = require("../src/tag/routes");

module.exports = (app) => {
    app.use("/post", post);
    app.use("/tag", tag);

    app.use("*", (req, res) => {
        res.status(404).send("Not Found");
    });
}