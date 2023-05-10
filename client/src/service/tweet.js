// header에 토큰을 명시에 주어야 하는데 이것을 어떻게 할 것인지?
export default class TweetService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket;
  }

  async getTweets(username) {
    let path = username ? `/${username}` : "";
    return await this.http.fetch(`/tweets${path}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    return await this.http.fetch(`/tweets/`, {
      method: "POST",
      body: JSON.stringify({
        text,
        username: "ellie",
        name: "ellie",
      }),
      headers: this.getHeaders(),
    });
  }

  async deleteTweet(tweetId) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
  }

  async updateTweet(tweetId, text) {
    return await this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
      headers: this.getHeaders(),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  onSync(callback) {
    return this.socket.onSync("newTweet", callback);
  }
}
