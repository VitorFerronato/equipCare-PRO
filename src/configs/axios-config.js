
import axios from "axios";

const API_URL = "http://localhost:3000/"

var axiosInstance = axios.create({
    baseURL: API_URL,
});

var axiosRaw = axios.create({
    baseURL: API_URL,
});



export { axiosRaw, API_URL };

export default axiosInstance;
