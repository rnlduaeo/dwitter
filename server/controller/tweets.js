import * as tweetRepository from "../data/tweets.js";
import { getSocket } from "../socket/socket.js";

// function 앞에 async가 붙으면 return data가 다 promise 형태로 반환됨. tweetRepository.get().then을 쓰거나 또는 앞에 await을 붙여주면 됨.
export async function getTweets(req, res) {
  res.status(200).send(await tweetRepository.getAll());
}

export async function getUserTweet(req, res) {
  const userId = req.userId;
  res.status(200).send(await tweetRepository.get(userId));
}

export async function postTweet(req, res) {
  const text = req.body.text;
  const userId = req.userId;
  const userTweet = await tweetRepository.create(userId, text);
  const socketIO = getSocket();
  socketIO.emit("newTweet", userTweet);
  res.status(201).send(userTweet);
}

// username, tweetId를 알 고 있음.
// tweetId로 tweet을 찾아서 username과 같을 때만 허용
export async function deleteTweet(req, res) {
  const tweetId = req.params.id;
  const userId = req.userId;
  const tweet = await tweetRepository.findById(tweetId);

  if (!tweet) {
    return res.sendStatus(404);
  } else if (tweet[0].dataValues.userId !== userId) {
    return res.sendStatus(403);
  }

  await tweetRepository.remove(tweetId);
  res.sendStatus(204);
}

export async function putTweet(req, res) {
  const text = req.body.text;
  const userId = req.userId;
  const tweetId = req.params.id;

  const tweet = await tweetRepository.findById(tweetId);

  if (!tweet) {
    return res.sendStatus(404);
  } else if (tweet[0].dataValues.userId !== userId) {
    return res.sendStatus(403);
  }

  const updated = await tweetRepository.modify(tweetId, text);

  if (updated) {
    res.status(200).send(updated);
  } else {
    res.sendStatus(404);
  }
}
