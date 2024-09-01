const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

const User = require("./User");

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
        created_at: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },
);

Role.hasMany(User, {onDelete: "SET NULL", foreignKey: "role_id", sourceKey: "id"});
User.belongsTo(Role, {foreignKey: "role_id", sourceKey: "id"});

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
