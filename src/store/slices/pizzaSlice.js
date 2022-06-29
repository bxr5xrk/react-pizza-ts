import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    pizzaItems: [],
    status: "",
    limitItemsOnPage: 4,
    pizzaEdges: ["Звичайний", "Сирний"],
    isPizzaPage: false,
};

export const fetchPizzaItems = createAsyncThunk(
    "pizza/fetchPizzaStatus",

    async ({ sortType, page, searchValue, category }) => {
        const sort = sortType.sortProp.replace("-", "");
        const sortOrder = sortType.sortProp.includes("-") ? "asc" : "desc";
        const pageLimit = `&p=${page}&l=${initialState.limitItemsOnPage}`;
        const searchPizza = searchValue ? "" : pageLimit;

        const { data } = await axios.get(
            `https://62a1db14cd2e8da9b0fca398.mockapi.io/pizza?${category}${searchPizza}&sortBy=${sort}&order=${sortOrder}`
        );
        return data;
    }
);

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setPizzaItems(state, action) {
            state.pizzaItems = action.payload;
        },
        setIsPizzaPage(state, action) {
            state.isPizzaPage = action.payload;
        },
    },
    extraReducers: {
        [fetchPizzaItems.pending]: (state) => {
            state.status = "loading";
            state.pizzaItems = [];
        },
        [fetchPizzaItems.fulfilled]: (state, action) => {
            state.pizzaItems = action.payload;
            state.status = "succes";
        },
        [fetchPizzaItems.rejected]: (state) => {
            state.status = "failed";
            state.pizzaItems = [];
        },
    },
});

export const selectPizza = (state) => state.pizzaSlice;

export const { setPizzaItems, setIsPizzaPage } = pizzaSlice.actions;
export default pizzaSlice.reducer;
