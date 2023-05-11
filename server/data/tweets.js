import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT t.id, u.username, u.name, u.url, t.userId, t.createdAt, t.text \
FROM users u \
RIGHT JOIN tweets t \
ON u.id = t.userId";

const ORDER_BY = "ORDER BY t.createdAt DESC";

// function 앞에 async를 붙여주면 return data가 promise 로 return 됨
export async function create(name, username, text) {
  const tweetId = await db
    .query(
      "INSERT INTO tweets(text, createdAt, userId) VALUES (?,curdate(),(SELECT id FROM users WHERE username=?))",
      [text, username]
    )
    .then((result) => {
      return result[0].insertId;
    });

  return await findById(tweetId);
}

export async function getAll() {
  // tweets를 ele를 돌면서 ele.userId 로 (username, name, profileUrl) 데이터를 가져와 tweets에 해당 데이터를 넣은 형태로 return!
  // array를 돌면서 array element에 뭔가를 수정하는 행위 예를 들어, object에 key를 추가한다던가의 행위는 map이 적절함.
  return db.query(`${SELECT_JOIN} ${ORDER_BY}`).then((result) => {
    return result[0];
  });
}

export async function get(username) {
  return db
    .query(`${SELECT_JOIN} WHERE username = ?`, [username])
    .then((result) => {
      return result[0];
    });
}

export async function remove(id) {
  db.query("DELETE FROM tweets WHERE id = ?", [id]).then((result) =>
    console.log(result)
  );
}

// tweet id를 가지고 userRepository에 있는 username, profileUrl, name을 포함한 tweet 리턴하기
export async function findById(id) {
  return db.query(`${SELECT_JOIN} WHERE t.id=?`, [id]).then((result) => {
    return result[0][0];
  });
}

export async function modify(id, text) {
  const modified = await db.query(
    "UPDATE tweets \
    SET text = ? \
    WHERE id = ?",
    [text, id]
  );
  if (modified) {
    return await await findById(id);
  }
}
