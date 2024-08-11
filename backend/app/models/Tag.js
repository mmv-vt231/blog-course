const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

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
