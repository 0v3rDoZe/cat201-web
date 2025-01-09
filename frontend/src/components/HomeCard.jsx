import React, { useState } from 'react';
import '../styles/Homecard.css';

function Card({ imageSrc, imageName, imageDescription }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="card-image-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <img src={imageSrc} alt={imageName} className="card-image" />
            <div className={`overlay ${isHovered ? 'hovered' : ''}`}>
                <h2 className="card-title">{imageName}</h2>
                {isHovered && (
                    <p className="card-description">
                        {imageDescription}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Card;