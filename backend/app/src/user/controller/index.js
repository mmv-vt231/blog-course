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

        if (!user) return res.status(404).json({ error: 'Not found' });

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
        const { role_id, email, nickname, allowed_notifications, } = req.body;

        const user = await User.findByPk(userId);

        if (!user) return res.status(404).json({ error: 'Not found' });

        user.role_id = role_id || user.role_id;
        user.email = email || user.email;
        user.nickname = nickname || user.nickname;
        user.allowed_notifications = allowed_notifications || user.allowed_notifications;

        await user.save();

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

        const user = await User.findByPk(userId);

        if (!user) return res.status(404).json({ error: 'Not found' });

        await user.destroy();

        res.status(204);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}