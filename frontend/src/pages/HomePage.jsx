import React from 'react';
import { Link } from 'react-router-dom';
import carImage1 from '../assets/home1.jpg'; // Ensure you have images in the assets folder
import carImage2 from '../assets/home2.jpg'; // Ensure you have images in the assets folder
import video from '../assets/homevideo.mp4';
import '../styles/styles.css'; // Import the styles
import exploreIcon from '../assets/bxs-map-alt.svg';
import titleIcon from '../assets/bxs-ghost.svg';

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header relative h-screen">
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover">
          <source src={video} type="video/mp4" />
        </video>
        <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-4xl font-bold text-white mt-8" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={titleIcon} alt="Title Icon" className="icon" style={{ width: '40px', height: '40px', marginRight: '8px', filter: 'invert(100%)' }} />
            Welcome to ReCarNation
            <img src={titleIcon} alt="Title Icon" className="icon" style={{ width: '40px', height: '40px', marginLeft: '8px', filter: 'invert(100%)' }} />
          </h1>
          <p className="text-xl mt-4 text-white">Your trusted platform for buying and selling pre-owned vehicles.</p>
        </div>
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
        <Link to="/car-list" className="btn bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300" style={{ display: 'flex', alignItems: 'center', margin: '0 auto' , width: '235px'}}>
          <img src={exploreIcon} alt="Explore Car List" className="icon" style={{ width: '30px', height: '30px', marginRight: '8px', filter: 'invert(100%)' }} />
          Explore Car List
        </Link>
      </section>
      <p className="text-xl mt-4">
        Explore the selection of cars available, what are you waiting for?
      </p>
    </div>
  );
}

export default HomePage;
