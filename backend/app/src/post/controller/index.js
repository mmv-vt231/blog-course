const Post = require("./../../../models/Post");

module.exports.getPostList = async (req, res) => {
    try {
        const posts = await Post.findAll();

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = Post.findByPk(postId);

        if (post)
            res.status(404);

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createPost = async (req, res) => {
    try {
        const {title, content} = req.body;

        if(!title || !content) {
            res.status(400).json({
                error: "Bad request!"
            });
        }

        const post = await Post.create({
            title,
            content
        })

        res.status(201).json(post);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}