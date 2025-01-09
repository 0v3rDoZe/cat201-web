import React from 'react';
import { Link } from 'react-router-dom';
import carImage1 from '../assets/home1.jpg'; // Ensure you have images in the assets folder
import carImage2 from '../assets/home2.jpg'; // Ensure you have images in the assets folder
import '../styles/styles.css'; // Import the styles

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="mt-50 text-4xl font-bold text-orange-50">w</h1>
        <h1 className="mt-50 text-4xl font-bold text-orange-50">w</h1>
        <h1 className="text-4xl font-bold text-blue-950 mt-8">Welcome to ReCarNation</h1>
        <p className="text-xl mt-4">Your trusted platform for buying and selling pre-owned vehicles.</p>
      </header>
      <section className="homepage-intro mt-8">
        <h2 className="text-2xl font-semibold">About ReCarNation</h2>
        <p className="mt-4 text-lg">
          ReCarNation is a unique platform where pre-owned vehicles get a second life. We offer a curated selection of used cars in excellent condition, each ready to embark on a new journey with a fresh owner. Whether you're buying or selling, ReCarNation ensures quality and trust in every transaction, making the experience seamless and reliable.
        </p>
      </section>
      <section className="homepage-images mt-8 flex justify-center">
        <img src={carImage1} alt="Car 1" className="w-1/3 h-auto mx-4 rounded-lg shadow-lg" />
        <img src={carImage2} alt="Car 2" className="w-1/3 h-auto mx-4 rounded-lg shadow-lg" />
      </section>
      <section className="homepage-cta mt-8">
        <Link to="/car-list" className="btn bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
          Explore Car List
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
