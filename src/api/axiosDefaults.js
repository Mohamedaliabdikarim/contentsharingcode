// Importing axios for HTTP requests
import axios from "axios";

// Setting default base URL for all axios requests
axios.defaults.baseURL = 'https://contentsharing-api-7b3cd872bc62.herokuapp.com/';

// Setting default header for POST requests to handle multipart/form-data
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

// Enabling credentials to be sent with requests
axios.defaults.withCredentials = true;

// Creating axios instances for requests and responses
export const axiosReq = axios.create(); // Instance for making requests
export const axiosRes = axios.create(); // Instance for handling responses
