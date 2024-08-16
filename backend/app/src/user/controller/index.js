const User = require("./../../../models/User");

module.exports.getUserList = async (req, res) => {
    try {
        const tags = await User.findAll();

        res.status(200).json(tags);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findByPk(userId);

        if (!user) return res.status(404);

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createUser = async (req, res) => {
    try {
        const {email, nickname, password, role_id} = req.body;

        if(!email || !nickname || !password || !role_id) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const user = await User.create({
            email,
            nickname,
            password,
            role_id,
            allowed_notifications: 0
        })

        res.status(201).json(user);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const [updateCount] = await User.update(req.body, {
            where: { id: userId },
        });

        if (!updateCount) return res.status(404);

        const user = await User.findByPk(userId);

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deleteCount = await User.destroy({ where: { id: userId }});

        if (!deleteCount) return res.status(404);

        res.status(200);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}