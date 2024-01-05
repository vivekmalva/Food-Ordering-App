import { useState } from "react";
import { useEffect } from "react";
import MealItem from "./MealItem";
import useFetch from "../hooks/useFetch";
import { fetchMeals, mealsActions } from "../store/meals";
import { useDispatch, useSelector } from "react-redux";

export default function Meals() {
  const dispatch = useDispatch();
  const {
    items: meals,
    isFetching,
    error,
  } = useSelector((state) => state.meals);
  const { items: cartItems } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(fetchMeals("/meals"));
  }, [dispatch]);
  //   console.log({ cartItems });
  if (error) {
    return <h2>Error while fetching data</h2>;
  }
  return (
    <div id="meals">
      {isFetching && <p>Loading Meal Items...</p>}
      {!isFetching &&
        meals.length > 0 &&
        meals.map((meal) => {
          return <MealItem key={meal.id} meal={meal} />;
        })}
    </div>
  );
}
