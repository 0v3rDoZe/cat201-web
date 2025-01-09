import React, { useState } from "react";
import "../styles/TouristCard.css";

const TouristCard = ({ image, title, description }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="touristcard">
      <img src={image} alt={title} />
      <div className="touristcard-body">
        <div className="touristcard-title">{title}</div>
        <div className={`touristcard-description ${expanded ? "expanded" : ""}`}>
          {description}
        </div>
        <button className="toggle-button" onClick={toggleDescription}>
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default TouristCard;

