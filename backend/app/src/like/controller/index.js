const Like = require("./../../../models/Like");

module.exports.getLikeList = async (req, res) => {
    try {
        const likes = await Like.findAll();

        res.status(200).json(likes);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getLike = async (req, res) => {
    try {
        const likeId = req.params.id;

        const like = await Like.findByPk(likeId);

        if (!like) return res.status(404);

        res.status(200).json(like);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createLike = async (req, res) => {
    try {
        const {user_id, post_id} = req.body;

        if(!user_id || !post_id) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const like = await Like.create({
            user_id,
            post_id
        })

        res.status(201).json(like);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.updateLike = async (req, res) => {
    try {
        const likeId = req.params.id;

        const [updateCount] = await Like.update(req.body, {
            where: { id: likeId },
        });

        if (!updateCount) return res.status(404);

        const like = await Like.findByPk(likeId);

        res.status(200).json(like);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.deleteLike = async (req, res) => {
    try {
        const likeId = req.params.id;

        const deleteCount = await Like.destroy({ where: { id: likeId }});

        if (!deleteCount) return res.status(404);

        res.status(200);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}