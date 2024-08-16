const post = require("../src/post/routes");

module.exports = (app) => {
    app.use("/post", post);

    app.use("*", (req, res) => {
        res.status(404).send("Not Found");
    });
}