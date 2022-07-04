import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type sort = {
    name: string;
    sortProp: string;
};

interface FilterSliceState {
    categoryId: number;
    sortType: sort;
    page: number;
    searchValue: string;
}

const initialState: FilterSliceState = {
    categoryId: 0,
    sortType: { name: "за популярністю", sortProp: "rating" },
    page: 1,
    searchValue: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSortType(state, action: PayloadAction<sort>) {
            state.sortType = action.payload;
        },
        onChangePage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        onChangeSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSearch(
            state,
            action: PayloadAction<{
                page: string;
                sortType: {
                    name: string;
                    sortProp: string;
                };
                categoryId: string;
            }>
        ) {
            state.page = Number(action.payload.page);
            state.sortType = action.payload.sortType;
            state.categoryId = Number(action.payload.categoryId);
        },
    },
});

export const selectFilter = (state: RootState) => state.filterSlice;

export const {
    setCategoryId,
    setSortType,
    onChangePage,
    onChangeSearchValue,
    setSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
