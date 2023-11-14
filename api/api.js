import { REACT_APP_SERVER_URL } from '@env';

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

  get = async (endpoint, params={}) => {
    const paramList = [];
    for (let param in params) {
      paramList.push(`${param}=${params[param]}`);
    }
    const response = await fetch(`${this.baseUrl}${endpoint}${paramList.length ? `?${paramList.join('&')}`: ''}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return data;
      })
      .catch(error => {
        console.log(error);
      }
    );
    return response;
  }

  post = async (endpoint, body={}, params={}) => {
    const paramList = [];
    let status;
    for (let param in params) {
      paramList.push(`${param}=${params[param]}`);
    }
    const response = await fetch(`${this.baseUrl}${endpoint}${paramList.length ? `?${paramList.join('&')}`: ''}`, {
      method: "POST",
      credentials: "include",
      body: body
    })
    return this.handleResponse(response);
  }
}

const ToonAPI = new BaseToonAPI();

export default ToonAPI;