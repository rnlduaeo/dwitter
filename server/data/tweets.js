import * as userRepository from "./auth.js";

let date = new Date();

export let tweets = [
  {
    id: "1",
    userId: "1",
    createdAt: date.toISOString(),
    text: "Hello first tweet!",
  },
  {
    id: "2",
    userId: "2",
    createdAt: date.toISOString(),
    text: "Hello second tweet!",
  },
];

// function 앞에 async를 붙여주면 return data가 promise 로 return 됨
export async function create(name, username, text) {
  const id = Date.now().toString();
  const userData = await userRepository.findByUsername(username);

  const tweet = {
    id: id,
    userId: userData.id,
    createdAt: date.toISOString(),
    text: text,
  };
  tweets = [tweet, ...tweets];
  return this.findById(id);
}

export async function getAll() {
  // tweets를 ele를 돌면서 ele.userId 로 (username, name, profileUrl) 데이터를 가져와 tweets에 해당 데이터를 넣은 형태로 return!
  // array를 돌면서 array element에 뭔가를 수정하는 행위 예를 들어, object에 key를 추가한다던가의 행위는 map이 적절함.
  return Promise.all(
    tweets.map(async (tweet) => {
      let { username, name, profileUrl } = await userRepository.findById(
        tweet.userId
      );
      return { username, name, profileUrl, ...tweet };
    })
  );
}

export async function get(username) {
  const tweets = await this.getAll();
  return tweets.filter((tweet) => tweet.username === username);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

// tweet id를 가지고 userRepository에 있는 username, profileUrl, name을 포함한 tweet 리턴하기
export async function findById(id) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  const { username, name, profileUrl } = await userRepository.findById(
    tweet.userId
  );
  return { username, name, profileUrl, ...tweet };
}

export async function modify(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  tweet.text = text;
  return this.findById(id);
}
