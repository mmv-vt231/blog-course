const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

const Like = sequelize.define(
    "like",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false,
        }
    }
);

(async () => {
    try {
        await sequelize.sync();
        console.log("Like table synchronized successfully.");
    } catch (error) {
        console.error(
            "Error synchronizing Like table:",
            error.message,
        );
    }
})();

module.exports = Like;
