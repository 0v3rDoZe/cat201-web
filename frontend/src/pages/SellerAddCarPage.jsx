import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles

function SellerAddCarPage({ onCarAdded }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('Excellent Condition');
  const [type, setType] = useState('Sedan');
  const [mileage, setMileage] = useState('');
  const [transmission, setTransmission] = useState('Manual');
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const sellerEmail = localStorage.getItem('userEmail');

  const handleAddCar = async (e) => {
    e.preventDefault();
    if (!name || !price || !condition || !type || !mileage || !transmission || images.length === 0) {
      setError('Please enter all car details and at least one image.');
      return;
    }
    try {
      const response = await fetch('http://localhost:9090/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price, condition, type, mileage, transmission, images, email: sellerEmail })
      });
      if (response.ok) {
        const newCar = await response.json();
        setSuccess('Car added successfully!');
        setError('');
        // Clear form fields
        setName('');
        setPrice('');
        setCondition('Excellent Condition');
        setType('Sedan');
        setMileage('');
        setTransmission('Manual');
        setImages([]);
        setNewImageUrl('');
        onCarAdded(newCar);
      } else {
        setError('Failed to add car. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      console.error('Error during car addition:', error);
      setError('An error occurred. Please try again.');
      setSuccess('');
    }
  };

  const handleAddImageUrl = () => {
    if (newImageUrl) {
      setImages([...images, newImageUrl]);
      setNewImageUrl('');
    }
  };

  const handleCancelAddCar = () => {
    navigate('/seller');
  };

  return (
    <div className="add-car-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
      <h1 className="text-4xl font-bold mb-4">Add a Car</h1>
      <form onSubmit={handleAddCar} className="add-car-form">
        <div className="form-group mb-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="condition">Condition:</label>
          <select
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
            className="input-field"
          >
            <option value="Excellent Condition">Excellent Condition</option>
            <option value="Good Condition">Good Condition</option>
            <option value="Fair Condition">Fair Condition</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="type">Type:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="input-field"
          >
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Convertible">Convertible</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="mileage">Mileage:</label>
          <input
            type="number"
            id="mileage"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="transmission">Transmission:</label>
          <select
            id="transmission"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value)}
            required
            className="input-field"
          >
            <option value="Manual">Manual</option>
            <option value="Auto">Auto</option>
          </select>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="images">Image URL:</label>
          <input
            type="text"
            id="images"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="input-field"
          />
          <button type="button" onClick={handleAddImageUrl} className="btn bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ml-2">
            Add Image
          </button>
        </div>
        {images.length > 0 && (
          <div className="form-group mb-4">
            {images.map((image, index) => (
              <div key={index} className="image-preview-box">
                <img src={image} alt={`Car ${index}`} className="image-preview" />
              </div>
            ))}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="btn bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
          Add Car
        </button>
        <button type="button" onClick={handleCancelAddCar} className="btn bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ml-2">
          Cancel Add Car
        </button>
      </form>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>  
    </div>
  );
}

export default SellerAddCarPage;
