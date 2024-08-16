const Tag = require("./../../../models/Tag");

module.exports.getTagList = async (req, res) => {
    try {
        const tags = await Tag.findAll();

        res.status(200).json(tags);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getTag = async (req, res) => {
    try {
        const tagId = req.params.id;

        const tag = await Tag.findByPk(tagId);

        if (!tag) return res.status(404);

        res.status(200).json(tag);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.createTag = async (req, res) => {
    try {
        const {name, icon_path} = req.body;

        if(!name || !icon_path) {
            return res.status(400).json({
                error: "Bad request!"
            });
        }

        const tag = await Tag.create({
            name,
            icon_path
        })

        res.status(201).json(tag);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.updateTag = async (req, res) => {
    try {
        const tagId = req.params.id;

        const [updateCount] = await Tag.update(req.body, {
            where: { id: tagId },
        });

        if (!updateCount) return res.status(404);

        const tag = await Tag.findByPk(tagId);

        res.status(200).json(tag);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.deleteTag = async (req, res) => {
    try {
        const tagId = req.params.id;

        const deleteCount = await Tag.destroy({ where: { id: tagId }});

        if (!deleteCount) return res.status(404);

        res.status(200);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}