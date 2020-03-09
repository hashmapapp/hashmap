import axios from 'axios';

export class HttpWrapper {
  baseUrl = '';

  static createItem = (item, url) => {
    return axios
      .post(url, item)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
}
