const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

const Role = sequelize.define(
    "role",
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }
);

(async () => {
    try {
        await sequelize.sync();
        console.log("Role table synchronized successfully.");
    } catch (error) {
        console.error(
            "Error synchronizing Role table:",
            error.message,
        );
    }
})();

module.exports = Role;
