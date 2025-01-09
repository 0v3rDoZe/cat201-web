import React, { useState } from 'react';
import '../styles/CarCard.css'; // Ensure you have appropriate styles

function CarCard({ images, name, price, condition, email, type, mileage, transmission }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  console.log('CarCard props:', { images, name, price, condition, email, type, mileage, transmission });

  return (
    <div className="car-card bg-yellow-200 ">
      <div className="car-card-image-container">
        <button onClick={handlePrevImage} className="car-card-button">&#9664;</button>
        <img src={images[currentImageIndex]} alt={name} className="car-card-image" />
        <button onClick={handleNextImage} className="car-card-button">&#9654;</button>
      </div>
      <div className="car-card-info">
        <h3>{name}</h3>
        <p>Price: ${price}</p>
        <p>Condition: {condition}</p>
        <p>Type: {type}</p>
        <p>Owner: {email}</p>
        <p>Mileage: {mileage} miles</p>
        <p>Transmission: {transmission}</p>
      </div>
    </div>
  );
}

export default CarCard;
