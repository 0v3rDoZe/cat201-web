import React, { useState, useEffect } from 'react';
import CarCard from '../components/CarCard';
import '../styles/styles.css'; // Import the styles

function CarPage() {
  const [cars, setCars] = useState([]);
  const [filter, setFilter] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [showPriceRange, setShowPriceRange] = useState(false);

  useEffect(() => {
    fetch('http://localhost:9090/api/cars')
      .then(response => response.json())
      .then(data => setCars(data))
      .catch(error => console.error('Error fetching cars:', error));
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesType = filter === 'All' || car.type === filter;
    const matchesCondition = conditionFilter === 'All' || car.condition === conditionFilter;
    const matchesPrice = (!minPrice || car.price >= parseFloat(minPrice)) && (!maxPrice || car.price <= parseFloat(maxPrice));
    return matchesType && matchesCondition && matchesPrice;
  });

  return (
    <div>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-6xl font-bold text-blue-950">ReCarNation</h1>
      <h1 className="mt-50 text-2xl font-bold text-blue-950">~Where cars find a new home~</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      <div className="flex flex-col items-start mt-12 pl-28">
      <div className="text-left text-4xl text-blue-950">[ Car List ]</div>
      <h1 className="mt-50 text-1xl font-bold text-blue-950">Looking for a quality second-hand car? You've come to the right place! </h1>
      <h1 className="mt-50 text-1xl font-bold text-blue-950">Whether you're searching for a reliable sedan, a spacious SUV,  </h1>
      <h1 className="mt-50 text-1xl font-bold text-blue-950">or a fun convertible, we have a wide selection of pre-owned </h1>
      <h1 className="mt-50 text-1xl font-bold text-blue-950">pre-owned vehicles to suit every need and budget.</h1>
      <h1 className="mt-50 text-4xl font-bold text-orange-50">.</h1>
      </div>
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
      <div className="car-list mt-8">
        {filteredCars.map(car => (
          <CarCard
            key={car.id}
            images={car.images}
            name={car.name}
            price={car.price}
            condition={car.condition}
            email={car.email}
            type={car.type}
            mileage={car.mileage}
            transmission={car.transmission}
          />
        ))}
      </div>
    </div>
  );
}

export default CarPage;

