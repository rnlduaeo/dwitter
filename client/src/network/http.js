export class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.baseURL = baseURL;
    this.authErrorEventBus = authErrorEventBus;
  }

  async fetch(path, request) {
    // ... request.headers를 해주지 않으면 기존의 것을 다 덮어씌워 버림. 주의할것!
    const response = await fetch(`${this.baseURL}${path}`, {
      ...request,
      headers: {
        "Content-Type": "application/json",
        ...request.headers,
      },
    });

    // body가 없는 response에 json을 호출하면 에러가 발생할 수 있음
    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error(error);
    }
    const message = data && data.message ? data.message : "there is no body";
    if (response.status < 200 || response.status > 299) {
      const error = new Error(message);
      if (response.status === 401) {
        this.authErrorEventBus.notify(error);
        return;
      }
      throw error;
    }
    return data;
  }
}
