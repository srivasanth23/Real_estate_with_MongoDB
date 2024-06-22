import React from "react";
import HeartComponent from "../../components/HeartComponent";
import "./index.css";
import { truncate } from "lodash";
import {useNavigate } from "react-router-dom";

const PropertyCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flexColStart rc-card"
      onClick={() => navigate(`../properties/${item.id}`)}
    >
      <div className="heart-elem">
        <HeartComponent id={item?.id} />
      </div>
      <img src={item.image} alt="home" className="image-carousal" />
      <span className="secondaryText r-price">
        <span style={{ color: "orange" }}>$</span> {item.price}
      </span>
      <span className="primaryText">
        {truncate(item.title, { length: 20 })}
      </span>
      <span className="secondaryText">
        {truncate(item.description, { length: 50 })}
      </span>
    </div>
  );
};

export default PropertyCard;
