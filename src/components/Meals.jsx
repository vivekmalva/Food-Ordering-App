import { useState } from "react";
import { useEffect } from "react"
import MealItem from "./MealItem";
import useFetch from "../hooks/useFetch";

export default function Meals() {
    const {
        data : meals,
        error,
        isFetching
    } = useFetch([],"/meals");

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