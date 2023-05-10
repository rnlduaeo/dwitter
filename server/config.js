import dotenv from "dotenv";
dotenv.config();

// By using brackets you can define the property you want to access dynamically. With the dot notation you would need to know the name of the property in the code, while with brackets you can determine it at run time.
function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (value === null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}
export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
