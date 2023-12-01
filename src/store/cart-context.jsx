import { createContext, useReducer } from "react";
import useFetch from "../hooks/useFetch";

export const CartContext = createContext({
    items:[],
    addToCart:()=>{}
});


const mealsCartReducer = (state, action)=>{
    if(action.type === 'ADD_TO_CART') {
        const cartItems = [...state.items];
        const availableMeals = action.payload.availableMeals;
        // console.log("cartItems",cartItems)
        const itemIndex = cartItems.findIndex((item)=>item.id === action.payload.mealId);
        if(itemIndex === -1) {
            // new item
            const newItem = availableMeals.find((meal)=>meal.id===action.payload.mealId);
            cartItems.push({
                id:newItem.id,
                name: newItem.name,
                price: newItem.price,
                quantity: 1
            })
        } else {
            // existing item
            const existingCartItem = cartItems[itemIndex];
            const updatedCartItem = {
                ...existingCartItem,
                quantity : existingCartItem.quantity + 1
            };

            cartItems[itemIndex] = updatedCartItem;
        }
        console.log("cartItems", cartItems)
        return {items: cartItems}

    }
    return state;
}
export default function CartContextProvider ({children}){
    const [mealsCartState, mealCartDispatcher] = useReducer(mealsCartReducer, {
        items: []
    });
    const {data : availableMeals} = useFetch([],"/meals");

    const handleAddToCart = (mealId)=>{
        console.log("Added To Cart", mealId);
        mealCartDispatcher({
            type: 'ADD_TO_CART',
            payload: {mealId, availableMeals}
        })
    }
    const handleUpdateCart = ()=>{
        console.log("Cart updated")
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