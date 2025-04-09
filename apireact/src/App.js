import React, { useState } from 'react';
import { registerUser, loginUser, getDashboard } from './api';
import './App.css';

const App = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            console.log({ username, password });
            const response = await registerUser({ username, password });
            console.log('Response:', response.data);
            alert(response.data); // Show response message
        } catch (error) {
            alert(error.response?.data || 'Error occurred');
        }
    };

    const handleLogin = async () => {
        try {
            const { data } = await loginUser({ username, password });
            setToken(data.token); // Save token for future use
            alert('Login successful! Token saved.');
        } catch (error) {
            alert(error.response?.data || 'Error occurred');
        }
    };

    const handleDashboard = async () => {
        try {
            const { data } = await getDashboard(token);
            setMessage(data); // Display dashboard message
        } catch (error) {
            setMessage(error.response?.data || 'Access Denied');
        }
    };

    return (
        <div className='container'>
            <h1>React UI</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Registrar</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleDashboard}>Ir a Dashboard</button>
            <p>{message}</p>
        </div>
    );
};

export default App;
