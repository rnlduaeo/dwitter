import * as bcrypt from "bcrypt";
import { config } from "../config.js";

export let userData = [
  {
    id: "1",
    username: "ellie",
    password: "$2b$10$ItsVXzeYPMFKc4.k9S0Dz./bLlI1AzhsrleIE0rLY44jBhsB46MHi",
    name: "Ellie",
    email: "haemikim@amazon.com",
    profileUrl: "https://d2qt42rcwzspd6.cloudfront.net/overall.png",
  },
  {
    id: "2",
    username: "patrick2",
    password: "$2b$10$ItsVXzeYPMFKc4.k9S0Dz./bLlI1AzhsrleIE0rLY44jBhsB46MHi",
    name: "Janghoon You",
    email: "patrick2@gmail.com",
    profileUrl: "https://d2qt42rcwzspd6.cloudfront.net/overall.png",
  },
];

export async function create(userData) {
  this.userData.push({
    id: Date.now().toString(),
    username: userData.username,
    password: await bcrypt.hash(userData.password, config.bcrypt.saltRounds),
    name: userData.name,
    email: userData.email,
    profileUrl: userData.profileUrl,
  });

  return this.userData.at(-1).username;
}

export async function foundByUsername(username) {
  return this.userData.find((user) => user.username === username);
}

export async function foundById(id) {
  return this.userData.find((user) => user.id === id);
}

export async function isPasswordRight(userData) {
  const userFromDb = await this.foundByUsername(userData.username);
  return bcrypt.compareSync(userData.password, userFromDb.password);
}
