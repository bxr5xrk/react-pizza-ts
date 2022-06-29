import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    pizzaItemsCart: [],
};

const calculateTotalPrice = (state) => {
    state.totalPrice = state.pizzaItemsCart.reduce(
        (sum, i) => sum + i.price * i.count,
        0
    );
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizzaToCart(state, action) {
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
        pizzaitemDecrement(state, action) {
            const findPizza = state.pizzaItemsCart.find(
                (i) =>
                    i.id === action.payload.id &&
                    i.size === action.payload.size &&
                    i.pizzaType === action.payload.pizzaType
            );

            if (findPizza) {
                findPizza.count--;
            }
            if (findPizza.count === 0) {
                state.pizzaItemsCart = state.pizzaItemsCart.filter(
                    (pizza) => pizza !== findPizza
                );
            }

            calculateTotalPrice(state);
        },
        removePizzaFromCart(state, action) {
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

export const selectCart = (state) => state.cartSlice;

export const {
    addPizzaToCart,
    removePizzaFromCart,
    pizzaitemDecrement,
    clearPizzaCart,
} = cartSlice.actions;

export default cartSlice.reducer;
