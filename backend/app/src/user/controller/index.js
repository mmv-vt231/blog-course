const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("./../../../models/User");

module.exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Bad request!" });
        }

        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const isMatchPassword = bcrypt.compareSync(password, user.password);

        if (!isMatchPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        const payload = { id: user.id, email: user.email };
        const token = jwt.sign(payload, process.env.SECRET || "secret", {
            expiresIn: "30d"
        })

        res.status(200).json({ token });
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if(!currentPassword || !newPassword) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const user = await User.findByPk(req.user.id);

        if (!user) return res.status(404).json({ error: 'Not found' });

        const isMatchPassword = bcrypt.compareSync(currentPassword, user.password);

        if (!isMatchPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }

        user.password = bcrypt.hashSync(newPassword, 10);

        await user.save();

        res.status(200);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

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

module.exports.searchUser = async (req, res) => {
    try {
        const {query} = req.body;

        if(!query) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const users = await User.findAll({
            where: {
                title: {
                    [Op.like]: `%${query}%`,
                }
            }
        });

        res.status(200).json(users);
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

        const userWithNickname = await User.findOne({ where: { nickname } });

        if(userWithNickname) {
            return res.status(400).json({
                error: "User with this nickname already registered!"
            });
        }

        const userWithEmail = await User.findOne({ where: { email } });

        if(userWithEmail) {
            return res.status(400).json({
                error: "User with this email already registered!"
            });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
            email,
            nickname,
            password: hashedPassword,
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