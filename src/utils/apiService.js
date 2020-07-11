import queryString from "querystring";
/**
 * @class ApiService
 * @description Contains methods for making asynchronous Http requests
 * @exports ApiService
 */

const BASE_URL = "https://pro-zone.herokuapp.com";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTk0MTg1NDczLCJleHAiOjE1OTY3Nzc0NzN9.BNp8WsyYR0WucmfuCxg_hrVZXTrgj0--lwTnyO-IBBg";
class ApiService {
  static ENDPOINTS = {
    providers: `${BASE_URL}/providers`,
    imageUpload: `${BASE_URL}/upload`,
  };

  /**
   * @method get
   * @description makes a GET request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async get(url, data) {
    const response = await fetch(
      `${url}${data ? `?${queryString.stringify(data)}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  }

  /**
   * @method post
   * @description makes a POST request
   * @param {string} url The request url
   * @param {object} data The request params
   * @returns {object} request reponse in JSON format
   */

  static async post(url, data) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }

  static async put(url, data) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  }
}

export default ApiService;
