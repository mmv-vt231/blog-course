const sequelize = require("../DB/mysql");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "user",
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
      validate:{
        isEmail: true
      }
    },
    nickname: {
      type: DataTypes.STRING(255),
      unique:  true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    allowed_notifications: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }
);

(async () => {
  try {
    await sequelize.sync();
    console.log("User table synchronized successfully.");
  } catch (error) {
    console.error(
      "Error synchronizing User table:",
      error.message,
    );
  }
})();

module.exports = User;
