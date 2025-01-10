import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Import the styles

function SoldCarPage() {
  const [soldCars, setSoldCars] = useState([]);
  const sellerEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    fetch('http://localhost:9090/api/purchase')
      .then(response => response.json())
      .then(data => {
        const sellerSoldCars = data.filter(purchase => purchase.ownerEmail === sellerEmail);
        setSoldCars(sellerSoldCars);
      })
      .catch(error => console.error('Error fetching sold cars:', error));
  }, [sellerEmail]);

  return (
    <div className="sold-car-page-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1> 
      <h1 className="mt-50 text-6xl font-bold text-blue-950">Cars Sold</h1>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">~Someone's making bank~</h1>
      {soldCars.length > 0 ? (
        <div className="car-list mt-8">
          {soldCars.map((car, index) => (
            <SoldCarCard key={index} car={car} />
          ))}
        </div>
      ) : (
        <p>You have not sold any cars yet.</p>
      )}
    </div>
  );
}

function SoldCarCard({ car }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? car.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === car.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="car-card bg-yellow-200 p-4 mb-4 rounded-lg shadow-md text-left">
      <div className="car-card-image-container" style={{ width: '100%', height: '220px', overflow: 'hidden', position: 'relative' }}>
        <button onClick={handlePrevImage} className="car-card-button" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>&#9664;</button>
        <img src={car.images[currentImageIndex]} alt={car.carName} className="car-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button onClick={handleNextImage} className="car-card-button" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>&#9654;</button>
      </div>
      <h3 className="text-2xl font-bold text-center">{car.carName}</h3>
      <p>Price: RM{car.price}</p>
      <p>Condition: {car.condition}</p>
      <p>Type: {car.type}</p>
      <p>Mileage: {car.mileage} km</p>
      <p>Transmission: {car.transmission}</p>
      <p>Payment Method: {car.paymentMethod}</p>
      <p>Payment Status: {car.paymentStatus}</p>
      <p>Shipping Address: {car.shippingAddress}</p>
    </div>
  );
}

export default SoldCarPage;
