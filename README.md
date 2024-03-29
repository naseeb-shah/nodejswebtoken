# nodejswebtoken
Sure, here's a basic example of React components to handle user registration, login, and token login, and storing the token in localStorage:

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reg`, { username, email, password });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      console.log('Login successful:', response.data);
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleTokenLogin = async () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const response = await axios.post(`${API_BASE_URL}/token`, { token: storedToken });
        console.log('Token login successful:', response.data);
        setToken(storedToken);
      } catch (error) {
        console.error('Token login error:', error);
        localStorage.removeItem('token');
      }
    }
  };

  return (
    <div>
      <h2>User Registration</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>

      <h2>User Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      <h2>Token Login</h2>
      <button onClick={handleTokenLogin}>Token Login</button>

      <h2>Token: {token}</h2>
    </div>
  );
};

export default Auth;
```

Make sure to install Axios using `npm install axios` to handle HTTP requests. This code demonstrates the basic functionality of user registration, login, and token login, and storing the token in localStorage for later use.
