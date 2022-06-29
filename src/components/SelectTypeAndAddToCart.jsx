import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizzaToCart } from "../store/slices/cartSlice";
import { selectPizza } from "../store/slices/pizzaSlice";
import PizzaSizeAndTypes from "./PizzaSizeAndTypes";

const SelectTypeAndAddToCart = ({ id }) => {
    const dispatch = useDispatch();
    const [sizeActive, setSizeActive] = useState(0);
    const [typeActive, setTypeActive] = useState(0);

    const { pizzaEdges, pizzaItems, isPizzaPage } = useSelector(selectPizza);

    // for correctly display pizza page if it starter page
    const { title, image, sizes, pizzaType } = isPizzaPage
        ? pizzaItems
        : pizzaItems.find((i) => i.id === id);

    // if edges active add 20 to price
    const totalPizzaPrice =
        pizzaType[typeActive] === 1
            ? sizes[sizeActive].price + 20
            : sizes[sizeActive].price;

    const onClickAddPizza = () => {
        const pizzaItem = {
            id,
            title,
            price: totalPizzaPrice,
            image,
            size: sizes[sizeActive].size,
            pizzaType: pizzaEdges[typeActive],
        };
        dispatch(addPizzaToCart(pizzaItem));
    };

    const cartItem = useSelector((state) =>
        state.cartSlice.pizzaItemsCart.find(
            (obj) =>
                id === obj.id &&
                sizes[sizeActive].size === obj.size &&
                pizzaEdges[typeActive] === obj.pizzaType
        )
    );

    // pizza count
    const countItem = cartItem ? cartItem.count : 0;

    return (
        <div>
            <PizzaSizeAndTypes
                sizes={sizes}
                pizzaTypes={pizzaType}
                sizeActive={sizeActive}
                setSizeActive={setSizeActive}
                typeActive={typeActive}
                setTypeActive={setTypeActive}
            />

            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{totalPizzaPrice} грн</div>
                <div
                    className="button button--outline button--add"
                    onClick={onClickAddPizza}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавити</span>
                    {countItem > 0 && <i>{countItem}</i>}
                </div>
            </div>
        </div>
    );
};

export default SelectTypeAndAddToCart;
