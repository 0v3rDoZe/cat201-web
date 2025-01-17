import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SellerCarCard from '../components/SellerCarCard';
import '../styles/styles.css'; // Import the styles
import rejectIcon from '../assets/bxs-user-x.svg';
import addCarIcon from '../assets/bx-folder-plus.svg';
import image from '../assets/sell2.jpg'; // Ensure you have images in the assets folder

function SellerPage() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [transmissionFilter, setTransmissionFilter] = useState('All');
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showAddCarForm, setShowAddCarForm] = useState(false);
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
  const sellerEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();
  const location = useLocation();

  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/cars');
      const data = await response.json();
      const sellerCars = data.filter(car => car.email === sellerEmail);
      setCars(sellerCars);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:9090/api/test-drive');
      const data = await response.json();
      const sellerBookings = data.filter(booking => booking.ownerEmail === sellerEmail);
      setBookings(sellerBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleRejectBooking = async (booking) => {
    try {
      const response = await fetch('http://localhost:9090/api/test-drive', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: booking.name, email: booking.email, carModel: booking.carModel, date: booking.date, ownerEmail: booking.ownerEmail })
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b !== booking));
      } else {
        console.error('Failed to delete booking');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleDeleteCar = (carName) => {
    setCars(cars.filter(car => car.name !== carName));
  };

  useEffect(() => {
    fetchCars();
    fetchBookings();
  }, [sellerEmail, location]);

  const handleCarAdded = (newCar) => {
    setCars((prevCars) => [...prevCars, newCar]);
  };

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
        handleCarAdded(newCar);
        setShowAddCarForm(false);
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
    setShowAddCarForm(false);
  };

  const filteredCars = cars.filter(car => {
    const matchesType = filter === 'All' || car.type === filter;
    const matchesCondition = conditionFilter === 'All' || car.condition === conditionFilter;
    const matchesTransmission = transmissionFilter === 'All' || car.transmission === transmissionFilter;
    const matchesPrice = (!minPrice || car.price >= parseFloat(minPrice)) && (!maxPrice || car.price <= parseFloat(maxPrice));
    return matchesType && matchesCondition && matchesTransmission && matchesPrice;
  });

  return (
    <div className="seller-page-container">
      <div className="relative" style={{ height: '600px' }}>
        <img src={image} alt="Sell Cars" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <h1 className="mt-50 text-6xl font-bold text-white">Seller Dashboard</h1>
        </div>
      </div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1> 
      <h1 className="mt-50 text-6xl font-bold text-blue-950">Your Listed Cars</h1>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">~Showcase your vehicles~</h1>
      <div className="filter-buttons mt-4">
        <button onClick={() => setFilter('All')} className="btn bg-yellow-500 text-white">
          All
        </button>
        <button onClick={() => setFilter('Sedan')} className="btn bg-yellow-500 text-white">
          Sedan
        </button>
        <button onClick={() => setFilter('SUV')} className="btn bg-yellow-500 text-white">
          SUV
        </button>
        <button onClick={() => setFilter('Hatchback')} className="btn bg-yellow-500 text-white">
          Hatchback
        </button>
        <button onClick={() => setFilter('Convertible')} className="btn bg-yellow-500 text-white">
          Convertible
        </button>
      </div>
      <div className="price-range-button mt-4">
        <button onClick={() => setShowPriceRange(!showPriceRange)} className="btn bg-yellow-500 text-white">Price Range</button>
      </div>
      {showPriceRange && (
        <div className="price-filter mt-4">
          <label className="mr-4">
            Min Price:
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} className="ml-2 p-1 border rounded" />
          </label>
          <label>
            Max Price:
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} className="ml-2 p-1 border rounded" />
          </label>
        </div>
      )}
      <div className="condition-filter mt-4">
        <label>
          Condition:
          <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} className="ml-2 p-1 border rounded">
            <option value="All">All</option>
            <option value="Excellent Condition">Excellent Condition</option>
            <option value="Good Condition">Good Condition</option>
            <option value="Fair Condition">Fair Condition</option>
          </select>
        </label>
      </div>
      <div className="transmission-filter mt-4">
        <label>
          Transmission:
          <select value={transmissionFilter} onChange={(e) => setTransmissionFilter(e.target.value)} className="ml-2 p-1 border rounded">
            <option value="All">All</option>
            <option value="Auto">Auto</option>
            <option value="Manual">Manual</option>
          </select>
        </label>
      </div>
      <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setShowAddCarForm(true)} className="btn bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={addCarIcon} alt="Add Car" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Add a Car
        </button>
      </div>
      {showAddCarForm && (
        <div className="add-car-form mt-4">
          <form onSubmit={handleAddCar}>
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
              <label htmlFor="price">Price (RM):</label>
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
              <label htmlFor="mileage">Mileage (km):</label>
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
        </div>
      )}
      {filteredCars.length > 0 ? (
        <div className="car-list mt-8">
          {filteredCars.map(car => (
            <SellerCarCard
              key={car.name} // Ensure each child has a unique key
              images={car.images}
              name={car.name}
              price={car.price}
              condition={car.condition}
              email={car.email}
              type={car.type}
              mileage={car.mileage}
              transmission={car.transmission}
              onDelete={handleDeleteCar}
            />
          ))}
        </div>
      ) : (
        <p>~You have not posted any cars yet~</p>
      )}
      <h1 className="mt-50 text-4xl font-bold text-blue-950">Cars Booked For Test Drives</h1>
      {bookings.length > 0 ? (
        <div className="booking-list mt-4">
          {bookings.map((booking, index) => (
            <div key={index} className="booking-card p-4 border rounded-lg shadow-md bg-white mt-4 flex justify-between items-center">
              <p><strong>Car Model:</strong> {booking.carModel}  <strong>Customer Email:</strong> {booking.email}  <strong>Date:</strong> {booking.date}</p>
              <button onClick={() => handleRejectBooking(booking)} className="btn bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
                <img src={rejectIcon} alt="Reject Booking" className="icon" style={{ width: '40px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
                Reject
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
}

export default SellerPage;
