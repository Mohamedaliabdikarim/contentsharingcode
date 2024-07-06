import axios from "axios";
axios.defaults.baseURL = 'https://contentsharing-api-7b3cd872bc62.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create();
export const axiosRes = axios.create();