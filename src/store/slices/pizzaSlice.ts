import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface pizzaObj {
    id: string;
    title: string;
    price: number;
    image: string;
    sizes: [{ size: number; price: number }];
    pizzaType: number[];
};

interface PizzaSliceState {
    pizzaItems: pizzaObj[];
    status: "loading" | "success" | "failed";
    limitItemsOnPage: number;
    isPizzaPage: boolean;
}

const initialState: PizzaSliceState = {
    pizzaItems: [],
    status: "loading",
    limitItemsOnPage: 4,
    isPizzaPage: false,
};

export const fetchPizzaItems = createAsyncThunk(
    "pizza/fetchPizzaStatus",

    async ({
        sortType,
        page,
        searchValue,
        category,
    }: {
        sortType: { name: string; sortProp: string };
        page: number;
        searchValue: string;
        category: string;
    }) => {
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
        setPizzaItems(state, action: PayloadAction<pizzaObj[]>) {
            state.pizzaItems = action.payload;
        },
        setIsPizzaPage(state, action) {
            state.isPizzaPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzaItems.pending, (state) => {
            state.status = "loading";
            state.pizzaItems = [];
        });
        builder.addCase(fetchPizzaItems.fulfilled, (state, action) => {
            state.pizzaItems = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchPizzaItems.rejected, (state) => {
            state.status = "failed";
            state.pizzaItems = [];
        });
    },
    // extraReducers: {
    //     [fetchPizzaItems.pending]: (state) => {
    //         state.status = "loading";
    //         state.pizzaItems = [];
    //     },
    //     [fetchPizzaItems.fulfilled]: (state, action) => {
    //         state.pizzaItems = action.payload;
    //         state.status = "succes";
    //     },
    //     [fetchPizzaItems.rejected]: (state) => {
    //         state.status = "failed";
    //         state.pizzaItems = [];
    //     },
    // },
});

export const selectPizza = (state: RootState) => state.pizzaSlice;

export const { setPizzaItems, setIsPizzaPage } = pizzaSlice.actions;
export default pizzaSlice.reducer;
