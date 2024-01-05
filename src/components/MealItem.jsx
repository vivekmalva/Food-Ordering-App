import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart";

export default function MealItem({ meal }) {
  const dispatch = useDispatch();

  return (
    <div className="meal-item">
      <img src={`http://localhost:3000/${meal.image}`} />
      <div className="article">
        <h3 className="meal-title">{meal.name}</h3>
        <div className="meal-item-price ">${meal.price}</div>
        <p className="meal-item-description">{meal.description}</p>
      </div>
      <div className="meal-item-actions">
        <button
          className="button"
          onClick={() =>
            dispatch(
              cartActions.addToCart({
                id: meal.id,
                name: meal.name,
                price: meal.price,
              })
            )
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
