import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoryId: 0,
    sortType: { name: "за популярністю", sortProp: "rating" },
    page: 1,
    searchValue: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        onChangePage(state, action) {
            state.page = action.payload;
        },
        onChangeSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSearch(state, action) {
            state.page = Number(action.payload.page);
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const selectFilter = (state) => state.filterSlice;

export const {
    setCategoryId,
    setSortType,
    onChangePage,
    onChangeSearchValue,
    setSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
