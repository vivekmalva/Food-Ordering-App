import { useContext } from "react"
import { CartContext } from "../store/cart-context"


export default function MealItem({ meal }) {
    const { addToCart, items } = useContext(CartContext);

    return (
        <div className="meal-item">
            <img src={`http://localhost:3000/${meal.image}`} />
            <div className="article">
                <h3 className="meal-title">{meal.name}</h3>
                <div className="meal-item-price ">${meal.price}</div>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <div className="meal-item-actions">
                <button className="button" onClick={() => addToCart(meal.id)}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}