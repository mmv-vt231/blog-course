const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define(
    "comment",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        parent_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        like_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
    }, {
        timestamps: true,
    }
)

Comment.hasMany(Comment, {foreignKey: "parent_id", sourceKey: "id"});
Comment.belongsTo(Comment, {foreignKey: "parent_id", sourceKey: "id"});

(async () => {
    try {
        await sequelize.sync();
        console.log("Comment table synchronized successfully.");
    } catch (error) {
        console.error(
            "Error synchronizing Comment table:",
            error.message,
        );
    }
})();

module.exports = Comment;
