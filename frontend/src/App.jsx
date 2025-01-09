import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarPage from './pages/CarPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import './styles/styles.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div>
      <ScrollToTop />
      <div className="header">
        <h1 className="title text-2xl">ReCarNation</h1>
        <nav className="nav text-l">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-1xl">Home</Link>
              <Link to="/car-list" className="text-1xl">Car List</Link>
              <Link to="/meeting" className="text-1xl">Meeting/Car Test</Link>
              <Link to="/login" className="text-1xl" onClick={handleLogout}>Sign Out</Link>
            </>
          ) : (
            <Link to="/login" className="text-2xl">Login</Link>
          )}
        </nav>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin-login" element={<AdminLoginPage onLogin={handleLogin} />} />
        <Route path="/admin" element={isAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/car-list" element={isAuthenticated ? <CarPage /> : <Navigate to="/login" />} />
        <Route path="/meeting" element={isAuthenticated ? <div>Meeting/Car Test Page</div> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-description">
            <h2 className="footer-title">About ReCarNation</h2>
            <p className="footer-text">
              ReCarNation is a unique platform where pre-owned vehicles get a second life. It offers a curated selection of used cars in excellent condition, each ready to embark on a new journey with a fresh owner.
            </p>
          </div>
          <div className="footer-links">
            <h2 className="footer-title">Quick Links</h2>
            <nav className="footer-nav">
              <Link to="/">Home</Link>
              <Link to="/car-list">Car List</Link>
              <Link to="/meeting">Meeting/Car Test</Link>
            </nav>
          </div>
          <div className="footer-contact">
            <h2 className="footer-title">Contact Us</h2>
            <p className="footer-text">Email: matthew.ksk@gmail.com</p>
            <p className="footer-text">Phone: +60 164550866</p>
            <p className="footer-text">Address: Penang, Malaysia</p>
          </div>
        </div>
        <div className="footer-bottom"></div>
      </footer>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;