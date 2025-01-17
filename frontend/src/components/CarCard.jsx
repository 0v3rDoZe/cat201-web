import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CarCard.css'; // Ensure you have appropriate styles
import purchaseIcon from '../assets/bx-cart-add.svg'; 
import testDriveIcon from '../assets/bxs-key.svg';

function CarCard({ images, name, price, condition, email, type, mileage, transmission, onPurchase }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBookTestDrive = () => {
    navigate('/test-drive', { state: { carModel: name, ownerEmail: email } });
  };

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  console.log('CarCard props:', { images, name, price, condition, email, type, mileage, transmission });

  return (
    <div className="car-card bg-blue-950 text-white flex flex-col justify-between">
      <div>
        <div className="car-card-image-container" style={{ width: '100%', height: '285px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button onClick={handlePrevImage} className="car-card-button" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>&#9664;</button>
          <img src={images[currentImageIndex]} alt={name} className="car-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={handleNextImage} className="car-card-button" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>&#9654;</button>
        </div>
        <div className="car-card-info">
          <h3 style={{ fontSize: '1.2rem', color: '#FFD700' }}>{name}</h3>
          <p>Price: RM{price}</p>
          <p>Condition: {condition}</p>
          <p>Type: {type}</p>
          <p>Owner: {email}</p>
          <p>Mileage: {mileage} km</p>
          <p>Transmission: {transmission}</p>
          {showDetails && (
            <div className="car-details mt-4 p-4 border rounded-lg shadow-md bg-white text-black">
              <h4>Car Details</h4>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Price:</strong> {price}</p>
              <p><strong>Condition:</strong> {condition}</p>
              <p><strong>Type:</strong> {type}</p>
              <p><strong>Mileage:</strong> {mileage}</p>
              <p><strong>Transmission:</strong> {transmission}</p>
              <p><strong>Owner Email:</strong> {email}</p>
            </div>
          )}
        </div>
      </div>
      <div className="button-group mt-auto mb-2" style={{ display: 'flex', alignItems: 'stretch', paddingLeft: '10px', paddingRight: '10px' }}>
        <button onClick={handleBookTestDrive} className="btn bg-yellow-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-yellow-800 transition duration-300" style={{ display: 'flex', alignItems: 'center', flex: 1, height: '100%' }}>
          <img src={testDriveIcon} alt="Test Drive" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Book Test Drive
        </button>
        <button onClick={onPurchase} className="btn bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ml-4" style={{ display: 'flex', alignItems: 'center', flex: 1, height: '100%' }}>
          <img src={purchaseIcon} alt="Purchase" className="icon" style={{ width: '40px', height: '40px', marginRight: '8px', filter: 'invert(100%)' }} />
          Purchase
        </button>
      </div>
    </div>
  );
}

export default CarCard;

