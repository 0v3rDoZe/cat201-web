import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles
import loginIcon from '../assets/bxs-log-in.svg';
import userIcon from '../assets/bx-user.svg';
import sellerIcon from '../assets/bxs-store.svg';

function AdminLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:9090/api/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();
      console.log('AdminLoginPage response:', data);

      if (response.ok && data.loginStatus) {
        // If login is successful
        onLogin();
        navigate('/admin');
      } else {
        // If login fails
        setErrorMessage('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error occurred during login');
    }
  };

  const handleSignInAsUser = () => {
    navigate('/login');
  };

  const handleSignInAsSeller = () => {
    navigate('/seller-login');
  };

  return (
    <div className="login-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
      <h1 className="text-4xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group mb-4">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="btn bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300" style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
          <img src={loginIcon} alt="Login" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Login
        </button>
      </form>
      <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleSignInAsUser} className="btn bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={userIcon} alt="Login as User" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Log in as User
        </button>
      </div>
      <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleSignInAsSeller} className="btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={sellerIcon} alt="Login as Seller" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Log in as Seller
        </button>
      </div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
    </div>
  );
}

export default AdminLoginPage;