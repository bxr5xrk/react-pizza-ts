import React from "react";
import { Link } from "react-router-dom";
import SelectTypeAndAddToCart from "./SelectTypeAndAddToCart";

const Pizza = ({ id, title, image }) => {
    return (
        <div className="pizza-block__wrapper">
            <div className="pizza-block">
                <Link to={`/pizza/${id}`}>
                    <img
                        className="pizza-block__image"
                        src={image}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                </Link>

                <SelectTypeAndAddToCart id={id} />
            </div>
        </div>
    );
};

export default Pizza;
