const Post = require("./../../../models/Post");
const Tag = require("../../../models/Tag");

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

        const post = await Post.findByPk(postId);

        if (!post) return res.status(404);

        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createPost = async (req, res) => {
    try {
        const {title, content, short_description, is_private} = req.body;

        if(!title || !content || !short_description || is_private === undefined) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const post = await Post.create({
            title,
            content,
            short_description,
            is_private
        })

        res.status(201).json(post);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.updatePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const [updateCount] = await Post.update(req.body, {
            where: { id: postId },
        });

        if (!updateCount) return res.status(404);

        const post = await Post.findByPk(postId);

        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        const deleteCount = await Post.destroy({where: { id: postId }});

        if (!deleteCount) return res.status(404);

        res.status(200);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}