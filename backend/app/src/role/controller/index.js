const Role = require("./../../../models/Role");

module.exports.getRoleList = async (req, res) => {
    try {
        const roles = await Role.findAll();

        res.status(200).json(roles);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getRole = async (req, res) => {
    try {
        const roleId = req.params.id;

        const role = await Role.findByPk(roleId);

        if (!role) return res.status(404).json({ error: 'Not found' });

        res.status(200).json(role);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createRole = async (req, res) => {
    try {
        const {name} = req.body;

        if(!name) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const role = await Role.create({
            name
        })

        res.status(201).json(role);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.updateRole = async (req, res) => {
    try {
        const roleId = req.params.id;
        const { name } = req.body;

        const role = await Role.findByPk(roleId);

        if (!role) return res.status(404).json({ error: 'Not found' });

        role.name = name || role.name;

        await role.save();

        res.status(200).json(role);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.deleteRole = async (req, res) => {
    try {
        const roleId = req.params.id;

        const role = await Role.findByPk(roleId);

        if (!role) return res.status(404).json({ error: 'Not found' });

        await role.destroy();

        res.status(204);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}