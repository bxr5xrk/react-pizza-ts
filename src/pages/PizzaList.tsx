import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "../components/Pagination/Pagination";
import PizzaSkeleton from "../components/PizzaSkeleton";
import { ReadAndWriteQueryString } from "../utils/PizzaService";
import { fetchPizzaItems, selectPizza } from "../store/slices/pizzaSlice";
import { selectFilter } from "../store/slices/filterSlice";
import PizzaItem from "../components/PizzaItem";
import { useAppDispatch } from "../store/store";
import PizzaFilter from "../components/Filter/PizzaFilter";

const PizzaList = () => {
    // pizza items and request status
    const { pizzaItems, status } = useSelector(selectPizza);

    const { categoryId, sortType, searchValue, page } =
        useSelector(selectFilter);

    // generate empty items for skeleton
    const skeleton = [...new Array(4)].map((_, i) => <PizzaSkeleton key={i} />);

    // for display category 'Всі'
    const category: string = categoryId > 0 ? `category=${categoryId}` : "";

    const dispatch = useAppDispatch();

    // get pizza from server
    useEffect(() => {
        if (status !== "failed") {
            dispatch(
                fetchPizzaItems({
                    sortType,
                    page,
                    searchValue,
                    category,
                })
            );
        }

        window.scrollTo(0, 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortType, page, searchValue, category]);

    // for reading search query
    ReadAndWriteQueryString(categoryId, page, sortType);

    // show only those pizzas, that match search
    const filteredPizza = pizzaItems
        .filter((item: { title: string }) =>
            searchValue
                ? item.title.toLowerCase().includes(searchValue.toLowerCase())
                : item
        )
        .map((item) => <PizzaItem key={item.id} {...item} />);

    // block if nothing found
    const nothingFound = (titleText: string, bottomText: string) => (
        <div className="not-found">
            <h1 className="not-found__title">{titleText}</h1>
            <span className="not-found__bottom-text">{bottomText}</span>
        </div>
    );

    return (
        <div className="container">
            {status === "failed" ? (
                <>
                    {nothingFound(
                        "Наразі у нас технічні проблеми",
                        "Спобуйте пізніше"
                    )}
                </>
            ) : (
                <>
                    <PizzaFilter />

                    <h2 className="content__title">Pizza</h2>

                    {status === "loading" ? (
                        <div className="content__items">{skeleton}</div>
                    ) : !filteredPizza.length ? (
                        nothingFound(
                            "Нічого не знайдено :(",
                            "Спробуйте ще раз"
                        )
                    ) : (
                        <div className="content__items">{filteredPizza}</div>
                    )}

                    <Pagination category={category} />
                </>
            )}
        </div>
    );
};

export default PizzaList;
