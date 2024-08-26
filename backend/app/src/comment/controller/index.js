const Comment = require("./../../../models/Comment");

module.exports.getCommentList = async (req, res) => {
    try {
        const comments = await Comment.findAll();

        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await Comment.findByPk(commentId);

        if (!comment) return res.status(404).json({ error: 'Not found' });

        res.status(200).json(comment);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getReplies = async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await Comment.findByPk(commentId);

        if (!comment) return res.status(404).json({ error: 'Not found' });

        const comments = await Comment.findAll({
            where: {
                parent_id: commentId
            }
        });

        res.status(200).json(comments);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createComment = async (req, res) => {
    try {
        const {user_id, post_id, content} = req.body;

        if(!user_id || !post_id || !content) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const comment = await Comment.create({
            user_id,
            post_id,
            content,
            like_count: 0
        })

        res.status(201).json(comment);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.updateComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const { content } = req.body;

        const comment = await Comment.findByPk(commentId);

        if (!comment) return res.status(404).json({ error: 'Not found' });

        comment.content = content || comment.content;

        await comment.save();

        res.status(200).json(comment);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const comment = await Comment.findByPk(commentId);

        if (!comment) return res.status(404).json({ error: 'Not found' });

        await comment.destroy();

        res.status(204);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}