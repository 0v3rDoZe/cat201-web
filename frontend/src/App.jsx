import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarPage from './pages/CarPage';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import TestDrive from './pages/TestDrive';
import RegisterPage from './pages/RegisterPage';
import SellerLoginPage from './pages/SellerLoginPage';
import SellerRegisterPage from './pages/SellerRegisterPage';
import SellerPage from './pages/SellerPage';
import SellerAddCarPage from './pages/SellerAddCarPage';
import SoldCarPage from './pages/SoldCarPage';
import PurchasePage from './pages/PurchaseCarPage'; // Import the PurchasePage component
import UserPurchasePage from './pages/UserPurchasePage'; // Import the UserPurchasePage component
import homeIcon from './assets/bx-home.svg';
import logInIcon from './assets/bx-log-in.svg';
import carListIcon from './assets/bxs-car.svg';
import testDriveIcon from './assets/bxs-key.svg';
import signOutIcon from './assets/bx-log-out.svg';
import carsSoldIcon from './assets/bx-money-withdraw.svg';
import sellerDashboardIcon from './assets/bxs-user-account.svg';
import purchaseIcon from './assets/bx-cart-download.svg';
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (email, isAdmin = false, isSeller = false) => {
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
    setIsSeller(isSeller);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('isSeller', isSeller);
    navigate('/'); // Redirect to homepage after login
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setIsSeller(false);
    localStorage.removeItem('userEmail');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isSeller');
    navigate('/login');
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedIsSeller = localStorage.getItem('isSeller') === 'true';
    if (storedEmail) {
      setIsAuthenticated(true);
      setIsAdmin(storedIsAdmin);
      setIsSeller(storedIsSeller);
    }
  }, []);

  const isLoggedIn = !!localStorage.getItem('userEmail');

  return (
    <div>
      <ScrollToTop />
      <div className="header">
        <h1 className="title text-2xl">ReCarNation</h1>
        <nav className="nav text-l">
          {isAuthenticated && !isAdmin && !isSeller ? (
            <>
              <Link to="/" className="text-1xl" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={homeIcon} alt="Home" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Home
              </Link>
              <Link to="/car-list" className="text-1xl" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={carListIcon} alt="Car List" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Car List
              </Link>
              <Link to="/test-drive" className="text-1xl" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={testDriveIcon} alt="Test Drive" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Test Drive
              </Link>
              <Link to="/purchases" className="text-1xl" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={purchaseIcon} alt="Purchases" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Purchases
              </Link>
              <Link to="/login" className="text-1xl" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={signOutIcon} alt="Sign Out" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Sign Out
              </Link>
            </>
          ) : isAuthenticated && isAdmin ? (
            <Link to="/login" className="text-1xl" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
              <img src={signOutIcon} alt="Sign Out" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
              Sign Out
            </Link>
          ) : isAuthenticated && isSeller ? (
            <>
              <Link to="/seller" className="text-1xl" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={sellerDashboardIcon} alt="Seller Dashboard" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Seller Dashboard
              </Link>
              <Link to="/sold-cars" className="text-1xl" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={carsSoldIcon} alt="Cars Sold" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Cars Sold
              </Link>
              <Link to="/login" className="text-1xl" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={signOutIcon} alt="Sign Out" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Sign Out
              </Link>
            </>
          ) : (
            <Link to="/login" className="text-2xl" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logInIcon} alt="Login" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
              Login
            </Link>
          )}
        </nav>
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/admin-login" element={<AdminLoginPage onLogin={(email) => handleLogin(email, true)} />} />
        <Route path="/seller-login" element={<SellerLoginPage onLogin={(email) => handleLogin(email, false, true)} />} />
        <Route path="/seller-register" element={<SellerRegisterPage />} />
        <Route path="/admin" element={isAuthenticated && isAdmin ? <AdminPage /> : <Navigate to="/admin-login" />} />
        <Route path="/seller" element={isAuthenticated && isSeller ? <SellerPage /> : <Navigate to="/seller-login" />} />
        <Route path="/seller-add-car" element={isAuthenticated && isSeller ? <SellerAddCarPage /> : <Navigate to="/seller-login" />} />
        <Route path="/sold-cars" element={isAuthenticated && isSeller ? <SoldCarPage /> : <Navigate to="/seller-login" />} />
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/car-list" element={isAuthenticated && !isSeller && !isAdmin ? <CarPage /> : <Navigate to="/login" />} />
        <Route path="/meeting" element={isAuthenticated && !isSeller && !isAdmin ? <div>Meeting/Car Test Page</div> : <Navigate to="/login" />} />
        <Route path="/test-drive" element={isAuthenticated && !isSeller && !isAdmin ? <TestDrive /> : <Navigate to="/login" />} />
        <Route path="/purchase" element={isAuthenticated && !isSeller && !isAdmin ? <PurchasePage /> : <Navigate to="/login" />} /> {/* Add purchase route */}
        <Route path="/purchases" element={isAuthenticated && !isSeller && !isAdmin ? <UserPurchasePage /> : <Navigate to="/login" />} /> {/* Add user purchases route */}
        <Route path="/register" element={<RegisterPage />} />
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
          {isAuthenticated && !isAdmin && !isSeller && (
            <div className="footer-links">
              <h2 className="footer-title">Quick Links</h2>
              <nav className="footer-nav">
                <Link to="/">Home</Link>
                <Link to="/car-list">Car List</Link>
                <Link to="/test-drive">Test Drive</Link>
              </nav>
            </div>
          )}
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