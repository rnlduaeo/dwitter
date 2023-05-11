import * as userRepository from "./auth";

let date = new Date();

interface Tweet {
  id: string;
  userId: string;
  createdAt: string;
  text: string;
}

interface FullTweet extends Tweet {
  username?: string;
  name?: string;
  profileUrl?: string;
}

export let tweets = new Array<Tweet>(
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
  }
);

// function 앞에 async를 붙여주면 return data가 promise 로 return 됨
export async function create(
  userId: string,
  text: string
): Promise<FullTweet | undefined> {
  const id = Date.now().toString();
  const userData = await userRepository.foundById(userId);
  if (userData) {
    const tweet: Tweet = {
      id: id,
      userId: userData.id,
      createdAt: date.toISOString(),
      text: text,
    };
    tweets = [tweet, ...tweets];

    return (await findById(id))!; // type이 null이 아니라 있다고 확신하는 typescript 문법
  }
}

export async function getAll(): Promise<(FullTweet | undefined)[]> {
  // tweets를 ele를 돌면서 ele.userId 로 (username, name, profileUrl) 데이터를 가져와 tweets에 해당 데이터를 넣은 형태로 return!
  // array를 돌면서 array element에 뭔가를 수정하는 행위 예를 들어, object에 key를 추가한다던가의 행위는 map이 적절함.
  return Promise.all(
    tweets.map(async (tweet: Tweet) => {
      const foundUser = await userRepository.foundById(tweet.userId);
      if (foundUser) {
        let { username, name, profileUrl } = foundUser;
        return { username, name, profileUrl, ...tweet };
      }
    })
  );
}

// 또는 아래와 같이 작성해 주면 됨. username, name, profileUrl이 없을 수도 있으므로 type에 ?를 붙여 optional로 설정해 주어야 함.
// export async function getAll(): Promise<Tweet[]> {
//   return Promise.all(
//     tweets.map(async (tweet) => {
//       const user = await userRepository.foundById(tweet.userId);
//       return {
//         username: user?.username,
//         name: user?.name,
//         profileUrl: user?.profileUrl,
//         ...tweet,
//       };
//     })
//   );
// }

export async function get(userId: string): Promise<(FullTweet | undefined)[]> {
  const tweets = await getAll();
  return tweets.filter((tweet) => tweet?.userId === userId);
}

export async function remove(id: string): Promise<void> {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}

// tweet id를 가지고 userRepository에 있는 username, profileUrl, name을 포함한 tweet 리턴하기
export async function findById(id: string): Promise<FullTweet | undefined> {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet?.userId) {
    const foundUser = await userRepository.foundById(tweet.userId);

    if (foundUser) {
      const { username, name, profileUrl } = foundUser;
      return { username, name, profileUrl, ...tweet };
    }
    return;
  }
  console.error(`No tweet is found with tweetId: ${id}`);
  return;
}

export async function modify(
  id: string,
  text: string
): Promise<FullTweet | undefined> {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet != undefined) {
    tweet.text = text;
    return findById(id);
  } else {
    console.error(`no tweet found with tweetId: ${id}`);
    return;
  }
}
