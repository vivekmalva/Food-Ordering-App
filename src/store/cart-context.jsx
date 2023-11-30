import { createContext, useReducer } from "react";

export const CartContext = createContext({
    items:[],
    addToCart:()=>{}
});

const mealsCartReducer = (state, action)=>{
    return state;
}
export default function CartContextProvider ({children}){
    const [mealsCartState, mealCartDispatcher] = useReducer(mealsCartReducer, {
        items: []
    })
    const handleAddToCart = ()=>{
        console.log("Added To Cart");
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