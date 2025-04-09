import axios from 'axios';

const API = axios.create({ baseURL: 'https://laughing-orbit-69v9q6vr4vgj2xrr5-3001.app.github.dev/api/auth' });

export const registerUser = (data) => API.post('/register', data);
export const loginUser = (data) => API.post('/login', data);
export const getDashboard = (token) => API.get('/dashboard', { 
    headers: { 
        Authorization: `Bearer ${token} `
    }
});