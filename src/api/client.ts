import axios from "axios";
import { Storage, TOKEN_KEY } from "@/utils/storage";

const API_URL = 'https://api.freeapi.app/api/v1';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },  
    timeout: 15000,
});

const MAX_RETRIES = 3;

apiClient.interceptors.response.use(
    (response) => response,
    async(error) => {
        const {config} = error;

        const shouldRetry = !error.response || (error.response.status >= 500 && error.response.status <= 599);

        if(shouldRetry && (!config._retryCount || config._retryCount < MAX_RETRIES)) {
            config._retryCount = (config._retryCount || 0) +1;

            const backOffDelay = Math.pow(2, config._retryCount) * 1000;

            await new Promise(resolve => setTimeout(resolve, backOffDelay));
            return apiClient(config);
        }
        return Promise.reject(error);
    }
);

apiClient.interceptors.request.use( async (config) => {
    const token = await Storage.getItem(TOKEN_KEY);
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;