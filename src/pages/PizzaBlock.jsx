/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SelectTypeAndAddToCart from "../components/SelectTypeAndAddToCart";
import {
    selectPizza,
    setIsPizzaPage,
    setPizzaItems,
} from "../store/slices/pizzaSlice";

const PizzaBlock = () => {
    // get pizza id from search query
    const { id } = useParams();

    const [pizza, setPizza] = useState();

    const { pizzaItems } = useSelector(selectPizza);
    const dispatch = useDispatch();

    // перевірка чи pizzaItems має потрібну піцу,  щоб уникнути лишніх запитів на сервер
    useEffect(() => {
        if (!pizzaItems.length) {
            const fetchPizza = async (id) => {
                try {
                    const { data } = await axios.get(
                        `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza/${id}`
                    );
                    setPizza(data);
                    dispatch(setPizzaItems(data));
                } catch (e) {
                    console.log(e);
                }
            };
            fetchPizza(id);
            dispatch(setIsPizzaPage(true));
        } else {
            setPizza(pizzaItems.find((i) => i.id === id));
            dispatch(setIsPizzaPage(false));
        }
    }, []);

    const onClickBack = () => {
        dispatch(setIsPizzaPage(false));
    };

    return (
        <div className="container">
            {pizza ? (
                <div className="pizza-page">
                    <img
                        className="pizza-block__image"
                        src={pizza.image}
                        alt="pizza"
                    />
                    <div className="pizza-page__info">
                        <h1>{pizza.title}</h1>

                        <div className="pizza-block">
                            <SelectTypeAndAddToCart id={id} />
                        </div>

                        <div
                            onClick={onClickBack}
                            className="cart__bottom-buttons"
                        >
                            <Link
                                to="/"
                                className="button button--outline button--add go-back-btn"
                            >
                                <svg
                                    width="8"
                                    height="14"
                                    viewBox="0 0 8 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7 13L1 6.93015L6.86175 1"
                                        stroke="#D3D3D3"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                                <span>Повернутися назад</span>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default PizzaBlock;
