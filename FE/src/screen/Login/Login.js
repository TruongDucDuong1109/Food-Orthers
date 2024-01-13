import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, password });
            const { token, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Chuyển hướng đến trang phù hợp dựa trên vai trò
            window.location.href = role === 'admin' ? '/admin' : '/home';
        } catch (error) {
            console.error('Login failed', error.response.data);
            setError('Invalid credentials');
        }
    };

    return (
        <div>
            <h2>Login Form</h2>
            <div>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <Link to="/register">Register here</Link>.
            </p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
