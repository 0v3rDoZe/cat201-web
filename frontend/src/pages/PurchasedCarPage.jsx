import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Import the styles

function PurchasedCarPage() {
  const [purchasedCars, setPurchasedCars] = useState([]);
  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    fetch('http://localhost:9090/api/purchase')
      .then(response => response.json())
      .then(data => {
        const userPurchasedCars = data.filter(purchase => purchase.userEmail === userEmail);
        setPurchasedCars(userPurchasedCars);
      })
      .catch(error => console.error('Error fetching purchased cars:', error));
  }, [userEmail]);

  return (
    <div className="purchased-car-page-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1> 
      <h1 className="text-4xl font-bold mb-4">Purchased Cars</h1>
      {purchasedCars.length > 0 ? (
        <div className="car-list mt-8">
          {purchasedCars.map((car, index) => (
            <PurchasedCarCard key={index} car={car} />
          ))}
        </div>
      ) : (
        <p>You have not purchased any cars yet.</p>
      )}
    </div>
  );
}

function PurchasedCarCard({ car }) {
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
    <div className="car-card bg-yellow-200 p-4 mb-4 rounded-lg shadow-md">
      <div className="car-card-image-container">
        <button onClick={handlePrevImage} className="car-card-button">&#9664;</button>
        <img src={car.images[currentImageIndex]} alt={car.carName} className="car-card-image" />
        <button onClick={handleNextImage} className="car-card-button">&#9654;</button>
      </div>
      <h3 className="text-2xl font-bold">{car.carName}</h3>
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

export default PurchasedCarPage;
