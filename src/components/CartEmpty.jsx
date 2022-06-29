import React from "react";
import { Link } from "react-router-dom";

const CartEmpty = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Корзина порожня <span>😕</span>
            </h2>
            <p>Для того щоб замовити піцу перейдіть на головну сторінку</p>
            <img src="/img/shopping.png" alt="Empty cart" />
            <Link to="/" className="button button--black">
                <span>Повернутися на головну</span>
            </Link>
        </div>
    );
};

export default CartEmpty;
