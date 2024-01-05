import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], isFetching: undefined, error: undefined };
const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    populateAvailableMeals(state, action) {
      state.items = action.payload.meals;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setIsFetching(state, action) {
      state.isFetching = action.payload;
    },
  },
});

export const mealsActions = mealsSlice.actions;

export const fetchMeals = (url) => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(mealsActions.setIsFetching(true));
      const URL = "http://localhost:3000" + url;
      const response = await fetch(URL);
      const data = await response.json();
      return data;
    };
    try {
      const meals = await fetchData();
      dispatch(mealsActions.populateAvailableMeals({ meals }));
    } catch (error) {
      dispatch(mealsActions.setError(true));
    }
    dispatch(mealsActions.setIsFetching(false));
  };
};
export default mealsSlice.reducer;
