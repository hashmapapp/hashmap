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

  static updateItem = (item, url, id) => {
    return axios
      .patch(`${url}/${id}`, item)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
}
