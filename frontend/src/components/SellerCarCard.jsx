import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles
import deleteCarIcon from '../assets/bxs-trash.svg';

function SellerCarCard({ images, name, price, condition, email, type, mileage, transmission, onDelete }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

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

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDeleteCar = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/cars', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });
      if (response.ok) {
        onDelete(name);
      } else {
        console.error('Failed to delete car');
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className="car-card bg-yellow-200 flex flex-col justify-between">
      <div>
        <div className="car-card-image-container" style={{ width: '100%', height: '285px', overflow: 'hidden', position: 'relative' }}>
          <button onClick={handlePrevImage} className="car-card-button" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>&#9664;</button>
          <img src={images[currentImageIndex]} alt={name} className="car-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button onClick={handleNextImage} className="car-card-button" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>&#9654;</button>
        </div>
        <div className="car-card-info text-left">
          <h3 className="text-center" style={{ color: '#6E260E', fontSize: '1.2rem', fontWeight: 'bold' }}>{name}</h3>
          <p>Price: RM{price}</p>
          <p>Condition: {condition}</p>
          <p>Type: {type}</p>
          <p>Owner: {email}</p>
          <p>Mileage: {mileage} km</p>
          <p>Transmission: {transmission}</p>
          {showDetails && (
            <div className="car-details mt-4 p-4 border rounded-lg shadow-md bg-white">
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
      <button onClick={handleDeleteCar} className="btn bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 mt-4 mb-4" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={deleteCarIcon} alt="Delete Car" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
        Delete
      </button>
    </div>
  );
}

export default SellerCarCard;
