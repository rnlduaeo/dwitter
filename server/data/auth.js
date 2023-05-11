import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "User",
    timestamps: false,
  }
);

// await sequelize.sync();

export async function findByUsername(username) {
  return User.findOne({ where: { username } });
}

export async function findById(id) {
  return User.findByPk(id);
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;

  const created = await User.create({
    username: username,
    password: password,
    name: name,
    email: email,
    url: url,
  });

  return created.dataValues.id;
}
