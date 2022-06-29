import React from "react";
import Categories from "./Categories";
import PizzaSearch from "./Search/PizzaSearch";
import Sort from "./Sort";

const PizzaFilter = () => {
    return (
        <div className="content__top">
            <PizzaSearch />

            <div>
                <Categories />
                <Sort />
            </div>
        </div>
    );
};

export default PizzaFilter;
