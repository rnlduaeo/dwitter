export default class HttpClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async fetch(path, options) {
        const response = await fetch(`${this.baseURL}${path}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            }
        })

        // body가 없는 response에 json을 호출하면 에러가 발생할 수 있음
        let data;
        try {
            data = await response.json();
        } catch(error) {
            console.error(error);
        }

        if(response.status < 200 || response.status > 299) {
            const message = 
                data && data.message ? data.message : 'Something wrong';
            throw new Error(message);
        }
        return data;
    }
}