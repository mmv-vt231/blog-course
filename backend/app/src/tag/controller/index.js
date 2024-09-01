const Tag = require("./../../../models/Tag");
const Post = require("./../../../models/Post");

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

        if (!tag) return res.status(404).json({ error: 'Not found' });

        res.status(200).json(tag);
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports.getPosts = async (req, res) => {
    try {
        const tagId = req.params.id;

        const tag = await Tag.findByPk(tagId);

        if (!tag) return res.status(404).json({ error: 'Not found' });

        const posts = Post.findAll({
            where: {
                tag_id: tagId
            }
        });

        res.status(200).json(posts);
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
        const { name, icon_path } = req.body;

        const tag = await Tag.findByPk(tagId);

        if (!tag) return res.status(404).json({ error: 'Not found' });

        tag.name = name || tag.name;
        tag.icon_path = icon_path || tag.icon_path;

        await tag.save();

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

        const tag = await Tag.findByPk(tagId);

        if (!tag) return res.status(404).json({ error: 'Not found' });

        await tag.destroy();

        res.status(200).json({ id: tagId });
    } catch (e) {
        res.status(500).json({
            error: e.message
        })
    }
}