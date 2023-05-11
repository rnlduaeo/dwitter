import { sequelize } from "../db/database.js";
import { DataTypes } from "sequelize";
import { User } from "./auth.js";

const Tweet = sequelize.define(
  "Tweet",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    modelName: "Tweet",
    timestamps: false,
  }
);

User.hasMany(Tweet); // User 모델이 Tweet 모델과 일대다 관계를 가지고 있음을 정의
Tweet.belongsTo(User); // Tweet 모델이 User 모델에 속함을 정의

const joinOptions = {
  include: [
    {
      model: User,
      attributes: [],
    },
  ],
  attributes: [
    "id",
    "text",
    "createdAt",
    "userId",
    [sequelize.col("user.name"), "name"],
    [sequelize.col("user.username"), "username"],
    [sequelize.col("user.url"), "url"],
  ],
  order: [["createdAt", "DESC"]],
};
// function 앞에 async를 붙여주면 return data가 promise 로 return 됨
export async function create(userId, text) {
  return Tweet.create({
    userId,
    text,
  });
}

export async function getAll() {
  return Tweet.findAll(joinOptions);
}

// key와 value 값이 같으면 하나로 생략 가능하다.
export async function get(userId) {
  return Tweet.findAll({ where: { userId }, ...joinOptions });
}

export async function remove(id) {
  await Tweet.destroy({
    where: {
      id: id,
    },
  });
}

// tweet id를 가지고 userRepository에 있는 username, profileUrl, name을 포함한 tweet 리턴하기
export async function findById(id) {
  return Tweet.findAll({ where: { id }, ...joinOptions });
}

export async function modify(id, text) {
  const updatedRow = await Tweet.update(
    { text },
    {
      where: {
        id,
      },
    }
  );
  return Tweet.findOne({ where: { id }, ...joinOptions });
}
