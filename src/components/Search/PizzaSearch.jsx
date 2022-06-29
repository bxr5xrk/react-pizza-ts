import debounce from "lodash.debounce";
import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import st from "./PizzaSearch.module.scss";
import { onChangeSearchValue } from "../../store/slices/filterSlice";

const PizzaSearch = () => {
    // local value for correct display search query
    const [_value, _setValue] = useState("");

    // for change search query
    const dispatch = useDispatch();
    const setSearchValue = (searchValue) =>
        dispatch(onChangeSearchValue(searchValue));

    const searchPizzaRef = useRef();

    // for focus after user clicked clear input
    const onClickClearBtn = () => {
        setSearchValue("");
        _setValue("");
        searchPizzaRef.current.focus();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateSearchValue = useCallback(
        debounce((searchValue) => {
            setSearchValue(searchValue);
        }, 500),
        []
    );

    const onChangeInput = (event) => {
        _setValue(event.target.value);
        updateSearchValue(event.target.value);
    };

    return (
        <div className={st.container}>
            <svg
                className={st.icon}
                height="22"
                viewBox="0 0 48 48"
                width="22"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M31 28h-1.59l-.55-.55c1.96-2.27 3.14-5.22 3.14-8.45 0-7.18-5.82-13-13-13s-13 5.82-13 13 5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55v1.58l10 9.98 2.98-2.98-9.98-10zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" />
                <path d="M0 0h48v48h-48z" fill="none" />
            </svg>
            <input
                ref={searchPizzaRef}
                value={_value}
                onChange={onChangeInput}
                className={st.search}
                placeholder="Знайти піцу..."
            />
            {_value && (
                <svg
                    onClick={onClickClearBtn}
                    className={st.closeIcon}
                    height="22"
                    viewBox="0 0 200 200"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
                </svg>
            )}
        </div>
    );
};

export default PizzaSearch;
