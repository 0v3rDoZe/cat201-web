import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Import the styles

function UserPurchasePage() {
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
      <h1 className="mt-50 text-6xl font-bold text-blue-950">Purchased Car</h1>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">~Your journey begins here~</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <div className="flex flex-col items-start mt-12 pl-28">
        <div className="text-left text-4xl text-blue-950">[ Purchased Car List ]</div>
        <h1 className="mt-50 text-1xl font-bold text-blue-950">View all the second-hand cars you've successfully purchased in one place! </h1>
        <h1 className="mt-50 text-1xl font-bold text-blue-950">Easily access detailed information about each vehicle, including purchase date, car model, and price. </h1>
        <h1 className="mt-50 text-1xl font-bold text-blue-950">Keep track of your ownership history and manage post-sale details conveniently with just a click! </h1>
        <h1 className="mt-50 text-4xl font-bold text-orange-50"></h1>
      </div>
      {purchasedCars.length > 0 ? (
        <div className="car-list mt-8">
          {purchasedCars.map((car, index) => (
            <PurchasedCarCard key={index} car={car} />
          ))}
        </div>
      ) : (
        <p className="text-white">You have not purchased any cars yet.</p>
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
    <div className="car-card bg-blue-950 p-4 mb-4 rounded-lg shadow-md">
      <div className="car-card-image-container" style={{ width: '365px', height: '200px', overflow: 'hidden', position: 'relative' }}>
        <button onClick={handlePrevImage} className="car-card-button" style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}>&#9664;</button>
        <img src={car.images[currentImageIndex]} alt={car.carName} className="car-card-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <button onClick={handleNextImage} className="car-card-button" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}>&#9654;</button>
      </div>
      <h3 className="text-2xl font-bold text-white">{car.carName}</h3>
      <p className="text-white">Price: RM{car.price}</p>
      <p className="text-white">Condition: {car.condition}</p>
      <p className="text-white">Type: {car.type}</p>
      <p className="text-white">Mileage: {car.mileage} km</p>
      <p className="text-white">Transmission: {car.transmission}</p>
      <p className="text-white">Payment Method: {car.paymentMethod}</p>
      <p className="text-white">Payment Status: {car.paymentStatus}</p>
      <p className="text-white">Shipping Address: {car.shippingAddress}</p>
    </div>
  );
}

export default UserPurchasePage;