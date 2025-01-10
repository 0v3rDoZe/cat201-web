import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles
import registerIcon from '../assets/bx-file.svg';
import loginIcon from '../assets/bxs-log-in.svg';
import userIcon from '../assets/bx-user.svg';
import adminIcon from '../assets/bxs-user-rectangle.svg';

function SellerLoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9090/api/seller-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.loginStatus) {
        onLogin(email);
        navigate('/seller');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const handleSignInAsUser = () => {
    navigate('/login');
  };

  const handleSignInAsAdmin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="login-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
      <h1 className="text-4xl font-bold mb-4">Seller Login</h1>
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-600 transition duration-300" style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
          <img src={loginIcon} alt="Login" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Login
        </button>
      </form>
      <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => navigate('/seller-register')} className="btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={registerIcon} alt="Register as Seller" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Register as Seller
        </button>
      </div>
      <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleSignInAsUser} className="btn bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={userIcon} alt="Login as User" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Login as User
        </button>
      </div>
      <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={handleSignInAsAdmin} className="btn bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={adminIcon} alt="Login as Admin" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Login as Admin
        </button>
      </div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
    </div>
  );
}

export default SellerLoginPage;
