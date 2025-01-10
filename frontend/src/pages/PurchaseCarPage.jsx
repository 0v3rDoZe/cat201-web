import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles

function PurchaseCarPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { car } = location.state;
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');
  const [cardNumber, setCardNumber] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [leaseDuration, setLeaseDuration] = useState('6');
  const [shippingAddress, setShippingAddress] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }
  }, []);

  const handlePurchase = (e) => {
    e.preventDefault();
    let paymentStatus = 'Completed';
    let successMessage = 'Congratulations, you have successfully purchased your new car, we will inform the seller of your shipping address. Enjoy your new car!!';
    if (paymentMethod === 'Cash on Delivery') {
      paymentStatus = 'Pending';
      successMessage = 'Congratulations, you have successfully purchased your new car, we will inform the seller of your shipping address. Please ensure you have the cash ready by then and enjoy your new car!!';
    } else if (paymentMethod === 'Lease') {
      paymentStatus = 'Pending';
      successMessage = 'Congratulations, you have successfully leased your new car, we will inform the seller of your shipping address. Enjoy your new car!!';
    }
    const purchaseDetails = {
      carName: car.name,
      price: car.price,
      condition: car.condition,
      ownerEmail: car.email,
      type: car.type,
      mileage: car.mileage,
      transmission: car.transmission,
      images: car.images,
      userName,
      userEmail,
      paymentMethod,
      paymentStatus,
      cardNumber: paymentMethod === 'Credit/Debit Card' ? cardNumber : '',
      bankNumber: paymentMethod === 'Bank Transfer' ? bankNumber : '',
      leaseDuration: paymentMethod === 'Lease' ? leaseDuration : '',
      shippingAddress,
    };

    fetch('http://localhost:9090/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(purchaseDetails),
    })
      .then(response => response.json())
      .then(data => {
        setConfirmationMessage(successMessage);
        // Remove the car from productData.json
        fetch('http://localhost:9090/api/cars', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: car.name }),
        })
          .then(() => {
            setTimeout(() => {
              navigate('/car-list');
            }, 2000);
          })
          .catch(error => console.error('Error removing car:', error));
      })
      .catch(error => console.error('Error purchasing car:', error));
  };

  return (
    <div className="purchase-page-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-6xl font-bold text-blue-950">~Purchase {car.name}~</h1>
      <div className="form-group mb-4">
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={`$${car.price}`}
          readOnly
          className="input-field"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="condition">Condition:</label>
        <input
          type="text"
          id="condition"
          value={car.condition}
          readOnly
          className="input-field"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          value={car.type}
          readOnly
          className="input-field"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="mileage">Mileage:</label>
        <input
          type="text"
          id="mileage"
          value={`${car.mileage} miles`}
          readOnly
          className="input-field"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="transmission">Transmission:</label>
        <input
          type="text"
          id="transmission"
          value={car.transmission}
          readOnly
          className="input-field"
        />
      </div>
      <form onSubmit={handlePurchase} className="purchase-form mt-4">
        <div className="form-group mb-4">
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            id="userEmail"
            value={userEmail}
            readOnly
            className="input-field"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="input-field"
          >
            <option value="Credit/Debit Card">Credit/Debit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
            <option value="Lease">Lease</option>
          </select>
        </div>
        {paymentMethod === 'Credit/Debit Card' && (
          <div className="form-group mb-4">
            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              className="input-field"
            />
          </div>
        )}
        {paymentMethod === 'Bank Transfer' && (
          <div className="form-group mb-4">
            <label htmlFor="bankNumber">Bank Number:</label>
            <input
              type="text"
              id="bankNumber"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
              required
              className="input-field"
            />
          </div>
        )}
        {paymentMethod === 'Lease' && (
          <div className="form-group mb-4">
            <label htmlFor="leaseDuration">Lease Duration (months):</label>
            <select
              id="leaseDuration"
              value={leaseDuration}
              onChange={(e) => setLeaseDuration(e.target.value)}
              required
              className="input-field"
            >
              <option value="6">6</option>
              <option value="12">12</option>
              <option value="18">18</option>
              <option value="24">24</option>
              <option value="30">30</option>
              <option value="36">36</option>
            </select>
          </div>
        )}
        <div className="form-group mb-4">
          <label htmlFor="shippingAddress">Shipping Address:</label>
          <input
            type="text"
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            required
            className="input-field"
          />
        </div>
        {confirmationMessage && <p className="confirmation-message mt-4 text-green-500">{confirmationMessage}</p>}
        <button type="submit" className="btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
          Purchase
        </button>
      </form>
    </div>
  );
}

export default PurchaseCarPage;
