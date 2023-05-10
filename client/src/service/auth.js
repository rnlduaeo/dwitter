export default class AuthService {

  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  // token을 받아와서 어디에 저장할 것인지? 
  async login(username, password) {
    const data = await this.http.fetch(`/auth/signin`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      })
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }

  async me() {
    return this.http.fetch(`/auth/me`, {
      method: 'GET',
      headers: { Authorization: this.tokenStorage.getToken() },
    });
  }

  async logout() {
    this.tokenStorage.clearToken();
    return;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch(`/auth/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        email: email,
        profileUrl: url,
      })
    });
    this.tokenStorage.saveToken(data.token);
    return data;
  }
}
