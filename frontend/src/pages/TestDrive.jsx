import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/styles.css'; // Import the styles
import showDetailsIcon from '../assets/bx-file.svg';

function TestDrive() {
  const location = useLocation();
  const navigate = useNavigate();
  const carModel = location.state?.carModel || '';
  const ownerEmail = location.state?.ownerEmail || '';
  const [successMessage, setSuccessMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookedTestDrives, setBookedTestDrives] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCarIndex, setSelectedCarIndex] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      fetchBookedTestDrives(storedEmail);
    }
  }, []);

  const fetchBookedTestDrives = async (userEmail) => {
    try {
      const response = await fetch('http://localhost:9090/api/test-drive');
      const data = await response.json();
      const userTestDrives = data.filter((testDrive) => testDrive.email === userEmail);
      setBookedTestDrives(userTestDrives);
    } catch (error) {
      console.error('Error fetching test drives:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testDriveDetails = { name, email, carModel, date, ownerEmail };

    const selectedDate = new Date(date);
    const currentDate = new Date();
    const oneWeekFromNow = new Date(currentDate.setDate(currentDate.getDate() + 7));

    if (selectedDate < oneWeekFromNow) {
      setErrorMessage('Please select a date that is at least one week from now.');
      return;
    }

    const isDateBooked = bookedTestDrives.some(
      (testDrive) => testDrive.carModel === carModel && testDrive.date === date
    );

    if (isDateBooked) {
      setErrorMessage('This date has already been booked for the selected car. Please choose a different date.');
      return;
    }

    try {
      const response = await fetch('http://localhost:9090/api/test-drive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testDriveDetails),
      });

      if (response.ok) {
        setSuccessMessage(`You have successfully booked a test drive for the car you selected!!! We will inform the owner of the booking.`);
        setTimeout(() => {
          navigate('/car-list');
        }, 3000);
      } else {
        console.error('Failed to book test drive');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleShowDetails = (carModel, index) => {
    if (selectedCarIndex === index) {
      setSelectedCarIndex(null);
      setSelectedCar(null);
    } else {
      fetchCarDetails(carModel);
      setSelectedCarIndex(index);
    }
  };

  const fetchCarDetails = async (carModel) => {
    try {
      const response = await fetch('http://localhost:9090/api/products');
      const data = await response.json();
      const carDetails = data.find((car) => car.name === carModel);
      setSelectedCar(carDetails);
    } catch (error) {
      console.error('Error fetching car details:', error);
    }
  };

  return (
    <div className="test-drive-container">
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-6xl font-bold text-blue-950">Test Drive</h1>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">~Experience the thrill of driving~</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <div className="flex flex-col items-start mt-12 pl-28">
        <div className="text-left text-4xl text-blue-950">[ Test Drive Schedule ]</div>
        <h1 className="mt-50 text-1xl font-bold text-blue-950">Book a test drive to experience the car of your dreams. </h1>
        <h1 className="mt-50 text-1xl font-bold text-blue-950">Our team will assist you in scheduling a convenient time. </h1>
        <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      </div>
      <div className="test-drive-form mt-8">
        {successMessage && <p className="success-message mb-4 text-2xl font-bold text-green-600">{successMessage}</p>}
        {errorMessage && <p className="error-message mb-4 text-2xl font-bold text-red-600">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="input-field" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="car">Car Model:</label>
            <input type="text" id="car" value={carModel} readOnly className="input-field" />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="date">Preferred Date:</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="input-field" />
          </div>
          <button type="submit" className="btn bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
            Book Test Drive
          </button>
        </form>
      </div>
      <div className="booked-test-drives mt-8">
        <h2 className="text-2xl font-bold text-blue-950">Your Booked Test Drives</h2>
        {bookedTestDrives.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {bookedTestDrives.map((testDrive, index) => (
              <React.Fragment key={index}>
                <div className="p-4 border rounded-lg shadow-md flex justify-between items-center" style={{ backgroundColor: '#D2B48C' }}>
                  <div className="flex items-center space-x-4">
                    <p><strong>Car Model:</strong> {testDrive.carModel}</p>
                    <p><strong>Date:</strong> {testDrive.date}</p>
                    <p><strong>Owner Email:</strong> {testDrive.ownerEmail}</p>
                  </div>
                  <button onClick={() => handleShowDetails(testDrive.carModel, index)} className="btn bg-blue-950 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={showDetailsIcon} alt="Show Details" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
                    {selectedCarIndex === index ? 'Hide Car Details' : 'Show Car Details'}
                  </button>
                </div>
                {selectedCarIndex === index && selectedCar && (
                  <div className="car-details mt-8 p-4 border rounded-lg shadow-md" style={{ backgroundColor: '#F5F5F5' }}>
                    <h2 className="text-2xl font-bold text-blue-950">{selectedCar.name}</h2>
                    <p><strong>Price:</strong> ${selectedCar.price}</p>
                    <p><strong>Condition:</strong> {selectedCar.condition}</p>
                    <p><strong>Type:</strong> {selectedCar.type}</p>
                    <p><strong>Mileage:</strong> {selectedCar.mileage} miles</p>
                    <p><strong>Transmission:</strong> {selectedCar.transmission}</p>
                    <div className="car-images grid grid-cols-2 gap-4 mt-4">
                      {selectedCar.images.map((image, index) => (
                        <img key={index} src={image} alt={`Car ${index}`} className="w-full h-auto rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p>You have not booked any test drives yet.</p>
        )}
      </div>
    </div>
  );
}

export default TestDrive;
