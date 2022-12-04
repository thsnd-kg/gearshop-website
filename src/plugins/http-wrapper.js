import axios from 'axios';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

const noIntercept = (resp) => resp;

const DEFAULT_REQ_OPTS = {
  headers: {},
  ignoreInterceptor: false,
  withCredentials: false,
};

const REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

const METHODS_ALLOW_PAYLOAD = [
  REQUEST_METHODS.POST,
  REQUEST_METHODS.PUT,
  REQUEST_METHODS.PATCH,
];

export class HttpWrapper {
  #customHeaders;

  #errorMessages = {
    400: 'Request data went wrong',
    401: 'Endpoint requires authentication',
    403: 'Forbidden endpoint',
    404: 'Endpoint is not found',
    500: 'Something went wrong',
  };

  constructor(options = {}) {
    const { baseURL = '/', responseType = 'json', headers = {} } = options;
    this.#customHeaders = headers;
    this.$axios = axios.create({
      baseURL,
      responseType,
      headers: { ...DEFAULT_HEADERS, ...headers },
    });
  }

  removeAccessToken = () => {
    this.$axios.defaults.headers.common = {
      ...DEFAULT_HEADERS,
      ...this.#customHeaders,
    };
  };

  setAccessToken = (token) => {
    this.$axios.defaults.headers.common['Authorization'] = `${token}`;
  };

  async get(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      REQUEST_METHODS.GET,
      options,
      requestParams
    );
  }

  async post(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      REQUEST_METHODS.POST,
      options,
      requestParams
    );
  }

  async put(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      REQUEST_METHODS.PUT,
      options,
      requestParams
    );
  }

  async delete(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      REQUEST_METHODS.DELETE,
      options,
      requestParams
    );
  }

  async upload(url, form = {}, options = DEFAULT_REQ_OPTS) {
    const headers = {
      ...(options.headers || {}),
      'Content-Type': 'multipart/form-data',
    };
    return await this.sendRequest(
      url,
      REQUEST_METHODS.POST,
      { ...options, headers },
      form
    );
  }

  addRequestInterceptor = (successHandler, failHandler) => {
    this.$axios.interceptors.request.use(
      successHandler || noIntercept,
      failHandler || noIntercept
    );
  };

  addResponseInterceptor = (successHandler, failHandler) => {
    this.$axios.interceptors.response.use(
      successHandler || noIntercept,
      failHandler || noIntercept
    );
  };

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
    const { headers, ignoreInterceptor, withCredentials } = allOptions;

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
      data: requestBody,
      // transformRequest: [ this.#transformRequest ],
      ignoreInterceptor,
      withCredentials,
    };

    return await this.#parseResponse(this.$axios.request(url, opts));
  };

  #parseResponse = async (requester) => {
    try {
      const resp = await Promise.resolve(requester);
      const { data, isAxiosError, response } = resp;

      if (isAxiosError) {
        const { data: errorData } = response;
        const { status } = resp.toJSON();

        return { status, ...errorData, success: false };
      }

      return { status: resp.status, success: true, ...data };
    } catch (error) {
      return { status: 500, success: false, message: this.#errorMessages[500] };
    }
  };
  // try {
  //   const resp = await Promise.resolve(requester);
  //   const { data, isAxiosError } = resp;
  //   if (isAxiosError) {
  //     const { status } = resp.toJSON();
  //     return { status, success: false, message: this.#errorMessages[status] };
  //   }
  //   return { status: resp.status, ...data };
  // } catch (error) {
  //   if (error.toString().includes('401')) {
  //     return {
  //       status: 401,
  //       success: false,
  //       message: this.#errorMessages[401],
  //     };
  //   }

  //   if (error.toString().includes('400')) {
  //     return {
  //       status: 400,
  //       success: false,
  //       message: this.#errorMessages[400],
  //     };
  //   }
  //   return { status: 500, success: false, message: this.#errorMessages[500] };
  //     }
  //   };
}

export const $http = new HttpWrapper({
  baseURL: process.env.VUE_APP_API_URL + '/api',
});

$http.addResponseInterceptor(noIntercept, (error) => {
  return error;
});
