import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: 'https://gist.githubusercontent.com/c1assifier/3521e6791c553d50697ecb210c93e2e5/raw',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
});