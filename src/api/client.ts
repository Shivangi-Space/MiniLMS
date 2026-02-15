import axios from "axios";
import { Storage, TOKEN_KEY } from "@/utils/storage";

const API_URL = 'https://api.freeapi.app/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },  
    timeout: 10000,
});

apiClient.interceptors.request.use( async (config) => {
    const token = await Storage.getItem(TOKEN_KEY);
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;