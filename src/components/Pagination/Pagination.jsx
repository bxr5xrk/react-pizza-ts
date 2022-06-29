import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import st from "./Pagination.module.scss";
import { onChangePage, selectFilter } from "../../store/slices/filterSlice";
import { selectPizza } from "../../store/slices/pizzaSlice";

const Pagination = ({ category }) => {
    const [totalPages, setTotalPages] = useState();

    // get pizza count in selected category
    useEffect(() => {
        fetch(`https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}`)
            .then((res) => res.json())
            .then((arr) => {
                setTotalPages(arr.length);
            });
    }, [category]);

    const { limitItemsOnPage } = useSelector(selectPizza);

    const pages = Math.ceil(totalPages / limitItemsOnPage);

    const { page, searchValue } = useSelector(selectFilter);
    const dispatch = useDispatch();
    const changePage = (page) => dispatch(onChangePage(page));

    return (
        <div>
            {!searchValue ? (
                <div className={st.pagination}>
                    {page > 1 ? (
                        <span
                            className={st.page}
                            onClick={() => changePage(page - 1)}
                        >
                            {"<"}
                        </span>
                    ) : (
                        ""
                    )}

                    {pages > 1 &&
                        [...new Array(pages)].map((_, p) => (
                            <span
                                onClick={() => changePage(p + 1)}
                                className={
                                    p + 1 === page
                                        ? `${st.page} ${st.page__selected}`
                                        : st.page
                                }
                                key={p}
                            >
                                {p + 1}
                            </span>
                        ))}

                    {page < pages ? (
                        <span
                            className={st.page}
                            onClick={() => changePage(page + 1)}
                        >
                            {">"}
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Pagination;
