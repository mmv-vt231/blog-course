const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

const Post = require("./Post");

const Tag = sequelize.define(
    "tag",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        icon_path: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }
);

Tag.hasMany(Post, {onDelete: "SET NULL", foreignKey: "tag_id", sourceKey: "id"});
Post.belongsTo(Tag, {foreignKey: "tag_id", sourceKey: "id"});

(async () => {
    try {
        await sequelize.sync();
        console.log("Tag table synchronized successfully.");
    } catch (error) {
        console.error(
            "Error synchronizing Tag table:",
            error.message,
        );
    }
})();

module.exports = Tag;
