import axios from 'axios';

import {baseUrl} from './base_url';

export const api = {
  header: () => {
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return header;
  },

  getMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .get(baseUrl + url, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },

  postMethod: (url, data) => {
    var headers = api.header();
    const formData = new FormData();
    Object.keys(data).map(obj => {
      formData.append(obj, data[obj]);
    });
    return new Promise((resolve, reject) => {
      axios
        .post(baseUrl + url, data, {headers: headers})
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => resolve(err.response.data));
    });
  },

  putMethod: (url, data) => {
    var headers = api.header();
    return new Promise((resolve, reject) => {
      axios
        .put(baseUrl + url, data, {
          headers: headers,
        })
        .then(res => {
          if (res.status == 200) {
            resolve(res.data);
          }
        })
        .catch(err => reject(err));
    });
  },
};
