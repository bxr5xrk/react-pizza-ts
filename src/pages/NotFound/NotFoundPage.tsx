import React from "react";
import { Link } from "react-router-dom";
import st from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
    return (
        <div className={st.notFound}>
            <h1>Нічого не знайдено :(</h1>
            <p>
                Дана сторінка відсутня. <Link to="/">(перейти на головну)</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;
