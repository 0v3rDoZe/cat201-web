import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles
import registerIcon from '../assets/bx-file.svg';

function SellerRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9090/api/sellers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        alert('Registration successful! Please login.');
        navigate('/seller-login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
      <h1 className="text-4xl font-bold mb-4">Seller Register</h1>
      <form onSubmit={handleRegister} className="register-form">
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
        <button type="submit" className="btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300" style={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
          <img src={registerIcon} alt="Register" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Register
        </button>
      </form>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
    </div>
  );
}

export default SellerRegisterPage;
