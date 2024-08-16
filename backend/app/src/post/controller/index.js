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

        if (post) return res.status(404);

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createPost = async (req, res) => {
    try {
        const {title, content, short_description, is_private} = req.body;

        console.log("\x1b[31m Create Post \x1b[0m", req.body);

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
        const {title, content, short_description, is_private} = req.body;

        const post = Post.findByPk(postId);

        if (post) return res.status(404);

        post.title = title;
        post.content = content;
        post.short_description = short_description;
        post.is_private = is_private;

        await post.save();

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
        const post = await Post.findByPk(postId);

        if (post) return res.status(404);

        await post.destroy();

        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}