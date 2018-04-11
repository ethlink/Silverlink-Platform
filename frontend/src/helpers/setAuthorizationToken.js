import axios from 'axios';

export default () => {
  axios.interceptors.request.use((requestConfig) => {
    const newRequestConfig = requestConfig;
    if (localStorage.token && newRequestConfig.url.indexOf('cryptocompare') === -1) {
      newRequestConfig.headers.Authorization = `${localStorage.token}`;
    }

    return newRequestConfig;
  }, error => Promise.reject(error));
};
