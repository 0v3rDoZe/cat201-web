import React from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        return (
          <FaStar
            key={index}
            color={index < rating ? 'gold' : 'grey'}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
