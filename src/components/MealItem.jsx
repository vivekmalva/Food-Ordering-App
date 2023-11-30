export default function MealItem({meal}) {
    return (
        <div className="meal-item">
            <img src={`http://localhost:3000/${meal.image}`}/>
            <div className="article">
                <h3 className="meal-title">{meal.name}</h3>
                <div className="meal-item-price ">${meal.price}</div>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <div className="meal-item-actions">
                <button className="button">Add to Cart</button>
            </div>
        </div>
    )
}