const passport = require("passport");

const post = require("../src/post/routes");
const tag = require("../src/tag/routes");
const like = require("../src/like/routes");
const role = require("../src/role/routes");
const user = require("../src/user/routes");
const comment = require("../src/comment/routes");

module.exports = (app) => {
    app.use("/post", post);
    app.use("/user", user);
    app.use("/tag", passport.authenticate('jwt', { session: false }), tag);
    app.use("/like", passport.authenticate('jwt', { session: false }), like);
    app.use("/role", passport.authenticate('jwt', { session: false }), role);
    app.use("/comment", comment);

    app.use("*", (req, res) => {
        res.status(404).send("Not Found");
    });
}