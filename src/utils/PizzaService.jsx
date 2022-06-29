/* eslint-disable react-hooks/exhaustive-deps */
import QueryString from "qs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sortTypes } from "../components/Sort";
import { setSearch } from "../store/slices/filterSlice";

export const ReadAndWriteQueryString = (categoryId, page, sortType) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (window.location.search) {
            const params = QueryString.parse(window.location.search.slice(1));

            const sortType = sortTypes.find(
                (i) => i.sortProp === params.sortProp
            );

            dispatch(setSearch({ ...params, sortType }));
        }
    }, []);

    // make query string if vlues changed
    useEffect(() => {
        if (isMounted) {
            const queryString = QueryString.stringify({
                page,
                categoryId,
                sortProp: sortType.sortProp,
            });
            navigate(`?${queryString}`);
        }
        setIsMounted(true);
    }, [categoryId, page, sortType]);
};
