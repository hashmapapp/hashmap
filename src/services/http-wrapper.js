import axios from 'axios';

export class HttpWrapper {
  baseUrl = '';

  static createItem = (item, url) => {
    return axios.post(url, item);
  };

  static updateItem = (item, url, id) => {
    return axios.patch(`${url}/${id}`, item);
  };
}
