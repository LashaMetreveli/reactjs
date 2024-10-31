import React from "react";
import "./Card.css";

interface CardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  price,
  description,
  thumbnail,
  category,
}) => {
  return (
    <div className="card">
      <img src={thumbnail} alt={title} className="card-thumbnail" />{" "}
      <div className="card-content">
        <h1>{title}</h1>
        <p className="price">${price}</p>
        <hr />
        <h3 className="category">{category}</h3>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
