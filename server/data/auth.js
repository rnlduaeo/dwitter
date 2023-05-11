import { db } from "../db/database.js";

export async function findByUsername(username) {
  return db
    .query("SELECT * FROM users WHERE username=?", username)
    .then((result) => {
      return result[0][0];
    });
}

export async function findById(id) {
  return db.query("SELECT * FROM users WHERE id=?", id).then((result) => {
    return result[0][0];
  });
}

export async function createUser(user) {
  const { username, password, name, email, url } = user;
  return db
    .query(
      "INSERT INTO users (username, password, name, email, url) VALUES (?,?,?,?,?)",
      [username, password, name, email, url]
    )
    .then((result) => {
      return result[0].insertId;
    });
}
