import { REACT_APP_SERVER_URL } from '@env';
import { queryString } from '../utils/querystring';

class BaseToonAPI {
  constructor() {
    this.baseUrl = REACT_APP_SERVER_URL;
    this.handleResponse = async (response) => {
      const data = await response.json();
      return {
        status: response.status,
        data: data
      };
    };
  }

  get = async (path, params={}, token=null) => {
    const paramString = queryString(params);
    const options = {
      method: "GET",
      credentials: "include"
    }
    if (token) {
      options.headers = {
        Authorization: `Token ${token}`
      }
    }
    const response = await fetch(`${this.baseUrl}${path}${paramString}`, options)
    return this.handleResponse(response);
  }

  post = async (path, body={}, contentType=null, token=null) => {
    const options = {
      method: "POST",
      credentials: "include",
      body: body
    }
    const headers = {};
    if (token) {
      headers.Authorization = `Token ${token}`;
    }
    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    options.headers = headers;
    const response = await fetch(`${this.baseUrl}${path}`, options)
    return this.handleResponse(response);
  }
}

const ToonAPI = new BaseToonAPI();

export default ToonAPI;