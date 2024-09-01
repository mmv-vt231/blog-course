const { Op } = require('sequelize');

const Post = require("./../../../models/Post");
const Tag = require("./../../../models/Tag");
const Comment = require("./../../../models/Comment");

module.exports.getPostList = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: Tag,
            exclude: ["tag_id"]
        });

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

        const post = await Post.findByPk(postId, {
            include: Tag,
            exclude: ["tag_id"]
        });

        if (!post) return res.status(404).json({ error: 'Not found' });

        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getComments = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByPk(postId);

        if (!post) return res.status(404).json({ error: 'Not found' });

        const comments = await Comment.findAll({
            where: {
                post_id: postId
            }
        });

        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getRelated = async (req, res) => {
    try {
        const postId = req.params.id;

        const post = await Post.findByPk(postId);

        if (!post) return res.status(404).json({ error: 'Not found' });

        const posts = Post.findAll({
            where: {
                tag_id: post.tag_id
            }
        });

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.searchPost = async (req, res) => {
    try {
        const {query} = req.body;

        if(!query) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const posts = await Post.findAll({
            where: {
                title: {
                    [Op.like]: `%${query}%`,
                }
            }
        });

        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createPost = async (req, res) => {
    try {
        const {title, content, short_description, tag_id, is_private} = req.body;

        if(!title || !content || !short_description || !tag_id || is_private === undefined) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const post = await Post.create({
            title,
            content,
            short_description,
            tag_id,
            is_private
        }, {
            include: Tag,
            exclude: ["tag_id"]
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
        const { title, content, short_description, is_private } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) return res.status(404).json({ error: 'Not found' });

        post.title = title || post.title;
        post.content = content || post.content;
        post.short_description = short_description || post.short_description;
        post.is_private = is_private || post.is_private;

        await post.save();

        const updatedPost = await Post.findByPk(postId, {
            include: Tag,
            exclude: ["tag_id"]
        });

        res.status(200).json(updatedPost);
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

        if (!post) return res.status(404).json({ error: 'Not found' });

        await post.destroy();

        res.status(200).json({ id: postId });
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}