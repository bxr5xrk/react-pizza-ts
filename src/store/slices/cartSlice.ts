import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type pizzaItem = {
    id: string;
    title: string;
    price: number;
    image: string;
    size: number;
    pizzaType: string;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    pizzaItemsCart: pizzaItem[];
    pizzaEdges: string[];
}

const getItemsFromLocalStorage = () => {
    const data = localStorage.getItem("cart");

    return data && JSON.parse(data);
};

const getPriceFromLocalStorage = () => {
    const data = localStorage.getItem("price");

    return data && JSON.parse(data);
};

const initialState: CartSliceState = {
    totalPrice: getPriceFromLocalStorage(),
    pizzaItemsCart: getItemsFromLocalStorage(),
    pizzaEdges: ["Звичайний", "Сирний"],
};

const calculateTotalPrice = (state: CartSliceState) => {
    state.totalPrice = state.pizzaItemsCart.reduce(
        (sum, i) => sum + i.price * i.count,
        0
    );
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizzaToCart(state, action: PayloadAction<pizzaItem>) {
            const findPizza = state.pizzaItemsCart.find(
                (i) =>
                    i.id === action.payload.id &&
                    i.size === action.payload.size &&
                    i.pizzaType === action.payload.pizzaType
            );

            findPizza
                ? findPizza.count++
                : state.pizzaItemsCart.push({ ...action.payload, count: 1 });

            calculateTotalPrice(state);
        },
        pizzaitemDecrement(state, action: PayloadAction<pizzaItem>) {
            const findPizza = state.pizzaItemsCart.find(
                (i) =>
                    i.id === action.payload.id &&
                    i.size === action.payload.size &&
                    i.pizzaType === action.payload.pizzaType
            );

            if (findPizza) {
                findPizza.count--;
            }
            if (findPizza?.count === 0) {
                state.pizzaItemsCart = state.pizzaItemsCart.filter(
                    (pizza) => pizza !== findPizza
                );
            }

            calculateTotalPrice(state);
        },
        removePizzaFromCart(state, action: PayloadAction<pizzaItem>) {
            const findPizza = state.pizzaItemsCart.find(
                (i) =>
                    i.id === action.payload.id &&
                    i.size === action.payload.size &&
                    i.pizzaType === action.payload.pizzaType
            );

            state.pizzaItemsCart = state.pizzaItemsCart.filter(
                (pizza) => pizza !== findPizza
            );

            calculateTotalPrice(state);
        },
        clearPizzaCart(state) {
            state.pizzaItemsCart = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cartSlice;

export const selectPizzaById =
    (
        id: string,
        sizes: [{ size: number }],
        sizeActive: number,
        typeActive: number
    ) =>
    (state: RootState) =>
        state.cartSlice.pizzaItemsCart.find(
            (obj) =>
                id === obj.id &&
                sizes[sizeActive].size === obj.size &&
                initialState.pizzaEdges[typeActive] === obj.pizzaType
        );

export const {
    addPizzaToCart,
    removePizzaFromCart,
    pizzaitemDecrement,
    clearPizzaCart,
} = cartSlice.actions;

export default cartSlice.reducer;
