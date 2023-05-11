import { Sequelize } from "sequelize";
import { config } from "../config.js";

export const sequelize = new Sequelize({
  dialect: config.db.dialect,
  host: config.db.host,
  database: config.db.database,
  username: config.db.user,
  password: config.db.password,
  pool: {
    max: 100,
  },
});
