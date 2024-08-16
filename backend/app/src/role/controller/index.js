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

        if (!role) return res.status(404);

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

        const [updateCount] = await Role.update(req.body, {
            where: { id: roleId },
        });

        if (!updateCount) return res.status(404);

        const role = await Role.findByPk(roleId);

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

        const deleteCount = await Role.destroy({where: { id: roleId }});

        if (!deleteCount) return res.status(404);

        res.status(200);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}