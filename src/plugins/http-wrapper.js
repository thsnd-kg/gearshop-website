import axios from 'axios';

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json'
};

const DEFAULT_REQ_OPTS = {
    headers: {}, 
    ignoreInterceptor: false
};

const REQUEST_METHODS = {
    GET:    'GET',
    POST:   'POST',
    PUT:    'PUT',
    PATCH:  'PATCH',
    DELETE: 'DELETE'
};

const METHODS_ALLOW_PAYLOAD = [
    REQUEST_METHODS.POST,
    REQUEST_METHODS.PUT,
    REQUEST_METHODS.PATCH
  ];

export class HttpWrapper  {
    #customHeaders

    #errorMessages = {
        400: 'Request data went wrong',
        401: 'Endpoint requires authentication',
        403: 'Forbidden endpoint',
        404: 'Endpoint is not found',
        500: 'Something went wrong'
    }

    constructor(options = {}) {
        const { baseURL = '/', responseType = 'json', headers = {} } = options;
        this.#customHeaders = headers;
        this.$axios = axios.create({
            baseURL,
            responseType,
            headers: { ...DEFAULT_HEADERS, ...headers }
        });
    }

    removeAccessToken = () => {
        this.$axios.defaults.headers.common = { ...DEFAULT_HEADERS, ...this.#customHeaders };
    }

    setAccessToken = (token, type = 'Bearer ') => {
        this.$axios.defaults.headers.common['Authorization'] = `${type}${token}`;
    }

    async get(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
        return await this.sendRequest(url, REQUEST_METHODS.GET, options, requestParams);
    }

    async post(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
        return await this.sendRequest(url, REQUEST_METHODS.POST, options, requestParams);
    }
	
	async delete(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
        return await this.sendRequest(url, REQUEST_METHODS.DELETE, options, requestParams);
    }

    async upload(url, form = {}, options = DEFAULT_REQ_OPTS) {
        const headers = {
            ...options.headers || {},
            'Content-Type': 'multipart/form-data'
        };
        return await this.sendRequest(url, REQUEST_METHODS.POST, { ...options, headers }, form);
    }

    sendRequest = async (
        url,
        method,
        options = DEFAULT_REQ_OPTS,
        payload = {}
    ) => {
        if (!url) {
            throw new Error('String value of URL must correct');
        }

        const allOptions = { ...DEFAULT_REQ_OPTS, ...options };
        const { headers, ignoreInterceptor } = allOptions;

        let params = {};
        let requestBody = {};
        if (METHODS_ALLOW_PAYLOAD.includes(method)) {
            requestBody = payload;
        } else {
            params = new URLSearchParams(payload);
        }

        const opts = {
            method,
            params,
            headers,
            data:             requestBody,
            // transformRequest: [ this.#transformRequest ],
            ignoreInterceptor
        };

        return await this.#parseResponse(this.$axios.request(url, opts));
    };

    #parseResponse = async (requester) => {
        try {
          const resp = await Promise.resolve(requester);
          const { data, isAxiosError } = resp;
          if (isAxiosError) {
            const { status } = resp.toJSON();
            return { status, success: false, message: this.#errorMessages[status] };
          }
          return { status: resp.status, ...data };
        } catch (error) {
          return { status: 500, success: false, message: this.#errorMessages[500] };
        }
    }
}

export const $http = new HttpWrapper({
    baseURL:  process.env.VUE_APP_API_URL + '/api'
});