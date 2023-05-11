import * as bcrypt from "bcrypt";
import { config } from "../config";

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  profileUrl?: string | undefined;
}

export let userData = new Array<User>(
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
  }
);

export async function create(user: User) {
  userData.push({
    id: Date.now().toString(),
    username: user.username,
    password: await bcrypt.hash(user.password, config.bcrypt.saltRounds),
    name: user.name,
    email: user.email,
    profileUrl: user.profileUrl,
  });

  return userData.at(-1)?.id;
}

export async function foundByUsername(username: string) {
  return userData.find((user: User) => user.username === username);
}

export async function foundById(id: string): Promise<User | undefined> {
  return userData.find((user: User) => user.id === id);
}

export async function isPasswordRight(user: User) {
  const userFromDb = await foundByUsername(user.username);
  if (userFromDb) {
    return bcrypt.compareSync(user.password, userFromDb.password);
  } else {
    console.error(`No user found with userdata : ${user}`);
    return;
  }
}
