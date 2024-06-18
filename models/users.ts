import Sequelize from "sequelize";

import { sequelize } from "../utils/db";

export const Users = sequelize.define("users", {
  id: {
    type: Sequelize.STRING,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    allowNull: false,
    primaryKey:true,
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
