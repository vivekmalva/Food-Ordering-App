import { createContext, useReducer } from "react";
import useFetch from "../hooks/useFetch";

export const CartContext = createContext({
    items: [],
    addToCart: () => { }
});


const mealsCartReducer = (state, action) => {
    if (action.type === 'ADD_TO_CART') {
        const cartItems = [...state.items];
        const availableMeals = action.payload.availableMeals;
        const itemIndex = cartItems.findIndex((item) => item.id === action.payload.mealId);
        if (itemIndex === -1) {
            // new item
            const newItem = availableMeals.find((meal) => meal.id === action.payload.mealId);
            cartItems.push({
                id: newItem.id,
                name: newItem.name,
                price: newItem.price,
                quantity: 1
            })
        } else {
            // existing item
            const existingCartItem = cartItems[itemIndex];
            const updatedCartItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1
            };

            cartItems[itemIndex] = updatedCartItem;
        }
        // console.log("cartItems", cartItems)
        return { items: cartItems }

    }
    if (action.type === 'UPDATE_CART') {
        let cartItems = [...state.items];
        const cartAction = action.payload.cartAction;
        const itemIndex = cartItems.findIndex((item) => item.id === action.payload.mealId);
        const cartItem = cartItems[itemIndex];
        let updatedCartItem;
        if (cartAction === "decreaseQuantity") {
            updatedCartItem = {
                ...cartItem, quantity: cartItem.quantity - 1
            }
            if (updatedCartItem.quantity) {
                cartItems[itemIndex] = updatedCartItem;
            }
            else {
                cartItems = cartItems.filter((item) => item.id !== action.payload.mealId);
            }
        }
        if (cartAction === "increaseQuantity") {
            updatedCartItem = {
                ...cartItem, quantity: cartItem.quantity + 1
            }
            cartItems[itemIndex] = updatedCartItem;
        }
        return { items: cartItems }
    }
    return state;
}
export default function CartContextProvider({ children }) {
    const [mealsCartState, mealCartDispatcher] = useReducer(mealsCartReducer, {
        items: []
    });
    const { data: availableMeals } = useFetch([], "/meals");

    const handleAddToCart = (mealId) => {
        mealCartDispatcher({
            type: 'ADD_TO_CART',
            payload: { mealId, availableMeals }
        })
    }
    const handleUpdateCart = (cartAction, mealId) => {
        mealCartDispatcher({
            type: 'UPDATE_CART',
            payload: { cartAction, mealId }
        })
    }
    const ctxValue = {
        items: mealsCartState.items,
        addToCart: handleAddToCart,
        updateCart: handleUpdateCart
    }
    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}