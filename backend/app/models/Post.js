const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

const Comment = require("./Comment");
const Like = require("./Like");

const Post = sequelize.define(
    "post",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        tag_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        short_description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        is_private: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0
        },
    }
);

Post.hasMany(Comment, {foreignKey: "post_id", sourceKey: "id"});
Comment.belongsTo(Post, {foreignKey: "post_id", sourceKey: "id"});

Post.hasMany(Like, {foreignKey: "post_id", sourceKey: "id"});
Like.belongsTo(Post, {foreignKey: "post_id", sourceKey: "id"});

(async () => {
    try {
        await sequelize.sync();
        console.log("Post table synchronized successfully.");
    } catch (error) {
        console.error(
            "Error synchronizing Post table:",
            error.message,
        );
    }
})();

module.exports = Post;
