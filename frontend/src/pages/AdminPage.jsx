import React, { useState, useEffect } from 'react';
import '../styles/styles.css'; // Import the styles

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [cars, setCars] = useState([]);
  const [newUser, setNewUser] = useState({ email: '', password: '' });
  const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
  const [newCar, setNewCar] = useState({ name: '', price: '', condition: 'Excellent Condition', email: '', type: 'Sedan', mileage: '', transmission: 'Manual', images: [] });
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    fetch('http://localhost:9090/api/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));

    fetch('http://localhost:9090/api/admins')
      .then(response => response.json())
      .then(data => setAdmins(data))
      .catch(error => console.error('Error fetching admins:', error));

    fetch('http://localhost:9090/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password) {
      alert('Please enter both email and password');
      return;
    }
    try {
      const response = await fetch('http://localhost:9090/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      const data = await response.json();
      setUsers([...users, data]);
      setNewUser({ email: '', password: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdmin.email || !newAdmin.password) {
      alert('Please enter both email and password');
      return;
    }
    try {
      const response = await fetch('http://localhost:9090/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAdmin)
      });
      const data = await response.json();
      if (data.email && data.password) {
        setAdmins([...admins, data]);
        setNewAdmin({ email: '', password: '' });
      } else {
        alert('Failed to add admin. Please try again.');
      }
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const handleAddCar = async () => {
    if (!newCar.name || !newCar.price || !newCar.condition || !newCar.email || !newCar.type || !newCar.mileage || !newCar.transmission || newCar.images.length === 0) {
      alert('Please enter all car details and at least one image');
      return;
    }
    try {
      const response = await fetch('http://localhost:9090/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
      });
      const data = await response.json();
      setCars([...cars, data]);
      setNewCar({ name: '', price: '', condition: 'Excellent Condition', email: '', type: 'Sedan', mileage: '', transmission: 'Manual', images: [] });
      setNewImageUrl('');
    } catch (error) {
      console.error('Error adding car:', error);
    }
  };

  const handleAddImageUrl = () => {
    if (newImageUrl) {
      setNewCar({ ...newCar, images: [...newCar.images, newImageUrl] });
      setNewImageUrl('');
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      await fetch('http://localhost:9090/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      setUsers(users.filter(user => user.email !== email));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteAdmin = async (email) => {
    try {
      await fetch('http://localhost:9090/api/admins', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      setAdmins(admins.filter(admin => admin.email !== email));
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleDeleteCar = async (name) => {
    try {
      console.log(`Deleting car with name: ${name}`);
      const response = await fetch('http://localhost:9090/api/cars', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });
      const data = await response.json();
      console.log('Delete response:', data);
      setCars(cars.filter(car => car.name !== name));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const buttonStyle = {
    padding: '5px 10px',
    margin: '5px',
    backgroundColor: '#F59E0B', // yellow-500
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const buttonHoverStyle = {
    backgroundColor: '#D97706' // darker yellow for hover effect
  };

  const inputStyle = {
    marginRight: '10px'
  };

  const cardBoxStyle = {
    backgroundColor: '#D2B48C',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'black' 
  };

  return (
    <div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1> 
      <h1 className="mt-50 text-5xl font-bold text-blue-950">Admin Page</h1>
      <p>Welcome to the Admin Page. This is where you can manage the application.</p>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1> 
      <div>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">User</h1>
        <ul>
          {users.map(user => (
            <li key={user.email} style={cardBoxStyle}>
              <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                <strong>Email:</strong> {user.email} &nbsp;
                <strong>Password:</strong> {user.password}
              </div>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={() => handleDeleteUser(user.email)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={e => setNewUser({ ...newUser, email: e.target.value })}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={e => setNewUser({ ...newUser, password: e.target.value })}
          style={inputStyle}
        />
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
      <div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">Admins</h1>
        <ul>
          {admins.map(admin => (
            <li key={admin.email} style={cardBoxStyle}>
              <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
                <strong>Email:</strong> {admin.email} &nbsp;
                <strong>Password:</strong> {admin.password}
              </div>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={() => handleDeleteAdmin(admin.email)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <input
          type="email"
          placeholder="Email"
          value={newAdmin.email}
          onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={newAdmin.password}
          onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
          style={inputStyle}
        />
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleAddAdmin}
        >
          Add Admin
        </button>
      </div>
      <div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">Cars</h1>
        <ul>
          {cars.map(car => (
            <li key={car.name} style={cardBoxStyle}>
              <div style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px'}}>
                <strong>Name:</strong> {car.name} &nbsp;
                <strong>Price:</strong> {car.price} &nbsp;
                <strong>Condition:</strong> {car.condition} &nbsp;
                <strong>Email:</strong> {car.email} &nbsp;
                <strong>Type:</strong> {car.type} &nbsp;
                <strong>Mileage:</strong> {car.mileage} &nbsp;
                <strong>Transmission:</strong> {car.transmission}
              </div>
              <button
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                onClick={() => handleDeleteCar(car.name)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Name"
          value={newCar.name}
          onChange={e => setNewCar({ ...newCar, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Price"
          value={newCar.price}
          onChange={e => setNewCar({ ...newCar, price: e.target.value })}
          style={inputStyle}
        />
        <select
          value={newCar.condition}
          onChange={e => setNewCar({ ...newCar, condition: e.target.value })}
          style={inputStyle}
        >
          <option value="Excellent Condition">Excellent Condition</option>
          <option value="Good Condition">Good Condition</option>
          <option value="Fair Condition">Fair Condition</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          value={newCar.email}
          onChange={e => setNewCar({ ...newCar, email: e.target.value })}
          style={inputStyle}
        />
        <select
          value={newCar.type}
          onChange={e => setNewCar({ ...newCar, type: e.target.value })}
          style={inputStyle}
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Convertible">Convertible</option>
        </select>
        <input
          type="text"
          placeholder="Mileage"
          value={newCar.mileage}
          onChange={e => setNewCar({ ...newCar, mileage: e.target.value })}
          style={inputStyle}
        />
        <select
          value={newCar.transmission}
          onChange={e => setNewCar({ ...newCar, transmission: e.target.value })}
          style={inputStyle}
        >
          <option value="Manual">Manual</option>
          <option value="Auto">Auto</option>
        </select>
        <input
          type="text"
          placeholder="Image URL"
          value={newImageUrl}
          onChange={e => setNewImageUrl(e.target.value)}
          style={inputStyle}
        />
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleAddImageUrl}
        >
          Add Image URL
        </button>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleAddCar}
        >
          Add Car
        </button>
      </div>
    </div>
  );
}

export default AdminPage;