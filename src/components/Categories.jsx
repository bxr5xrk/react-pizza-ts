import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    onChangePage,
    selectFilter,
    setCategoryId,
} from "../store/slices/filterSlice";

const pizzaCategories = [
    "Всі",
    "М'ясні",
    "Вегетеріанські",
    "Гриль",
    "Гострі",
    "Закриті",
];

const Categories = () => {
    const { categoryId } = useSelector(selectFilter);

    const dispatch = useDispatch();
    const onClickCategory = (id) => dispatch(setCategoryId(id));

    const setPage = (page) => dispatch(onChangePage(page));

    const onChangeValue = (i) => {
        onClickCategory(i);
        setPage(1);
    };

    return (
        <div className="categories">
            <ul>
                {pizzaCategories.map((category, i) => (
                    <li
                        onClick={() => onChangeValue(i)}
                        className={categoryId === i ? "active" : ""}
                        key={i}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
