import React, { useState } from 'react';
import StarRating from './StarRating';
import '../styles/RoomCard.css';

const RoomCard = ({ images, title, description, location, price, rating }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fade, setFade] = useState(false);
    const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });

    const nextImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            setFade(false);
        }, 150);
    };

    const prevImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
            setFade(false);
        }, 150);
    };
    return (
        <div className="room-card hover:bg-white shadow-lg rounded-2g overflow-hidden w-[500px] h-[550px]">
            <div className="relative h-[350px]">
                <img
                    src={images[currentImageIndex]}
                    alt={`Room image ${currentImageIndex + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
                />
                <button onClick={prevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition duration-300">
                    &lt;
                </button>
                <button onClick={nextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition duration-300">
                    &gt;
                </button>
                <div className="absolute bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                    {currentImageIndex + 1} / {images.length}
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-900">{title}</h2>
                <p className="text-gray-700 text-base text-justify">{description}</p>
                <p className="text-gray-700 text-base text-center"><strong>Location:</strong> {location}</p>
                <p className="text-gray-700 text-base text-center"><strong>Price Range:</strong> {price}</p>
                <div className="room-card-rating text-gray-700 text-base text-center">
                    <strong>Rating:</strong> <StarRating rating={rating} />
                </div>
            </div>
        </div>
    );
};

export default RoomCard;