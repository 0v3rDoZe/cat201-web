import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Import the styles
import image from '../assets/sell1.jpg'; // Ensure you have images in the assets folder

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
      <div className="relative" style={{ height: '450px' }}>
        <img src={image} alt="Sold Cars" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <h1 className="mt-50 text-6xl font-bold text-white">Cars Sold</h1>
          <h1 className="mt-50 text-2xl font-bold text-white">~Cars that you’ve proudly sold~</h1>
        </div>
      </div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1> 
      <h1 className="mt-50 text-1xl font-bold text-blue-950">Looking for a quality second-hand car that’s already found its new owner? Here’s a showcase of </h1>
      <h1 className="mt-50 text-1xl font-bold text-blue-950">vehicles that have been successfully sold by yours truly. From reliable sedans </h1>
      <h1 className="mt-50 text-1xl font-bold text-blue-950">and spacious SUVs to sporty convertibles, these cars</h1>
      <h1 className="mt-50 text-1xl font-bold text-blue-950">have been chosen by satisfied buyers.</h1>
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
