import { useState } from "react";
import { useEffect } from "react"
import MealItem from "./MealItem";

export default function Meals() {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState();
    const [isFetching, setIsFetching] = useState();

    useEffect(()=>{
        async function fetchMeals() {
            setIsFetching(true);
            try {
                const response = await fetch("http://localhost:3000/meals");
                const mealsData = await response.json();
                // console.log(meals);
                setMeals(mealsData);
                setIsFetching(false);
            } catch(error) {
                setError(error.message || 'Something went wrong, please try later..')
                setIsFetching(false);
            }
            
        }
        fetchMeals();
    },[])
    if(error) {
        return <p>{error.message}</p>
    }
    return (
        <div id="meals">
            {isFetching && <p>Loading Meal Items...</p>}
            {!isFetching && meals.length > 0 &&  
                meals.map((meal)=>{
                     return <MealItem key={meal.id} meal={meal}/>
                })
            }
        </div>
    )
}