import React, { useEffect, useContext, useCallback } from "react";
import {
  deleteRestaurant,
  getRestaurants,
  updateRestaurantName,
  starRestaurant,
} from "../../api/restaurants";
import RestaurantsContext from "../../provider/restaurants";
import Restaurant from "./Restaurant";
import { CardList} from "./RestaurantCardStyles";
import AuthContext from "../../provider/auth";
import { PageTitle } from "./RestaurantFormStyles";
import useScrollAnimation from "../../hooks/useScrollAnimation";

const Restaurants = () => {
  const {
    state: { restaurants },
    dispatch,
  } = useContext(RestaurantsContext);

  const { authState } = useContext(AuthContext);
  useScrollAnimation(restaurants);

  useEffect(() => {
    async function fetchData() {
      const restaurantsData = await getRestaurants();
      dispatch({ type: "LOADED_RESTAURANTS", payload: restaurantsData });
    }
    fetchData();
  }, [dispatch]);

  
  const onDeleteRestaurant = useCallback(
    async (id) => {
      const responseStatus = await deleteRestaurant(id, authState.token);

      if (responseStatus !== 200) {
        alert("Deleting failed");
        return;
      }
      dispatch({ type: "DELETE_RESTAURANT", payload: id });
    },
    [authState.token, dispatch],
  );

  const onStarRestaurant = useCallback(
    async (id) => {
      const { data, status } = await starRestaurant(id, authState.token);

      if (status !== 201) {
        alert("Updating failed, the restaurant is already starred ");
        return;
      }

      dispatch({ type: "STAR_RESTAURANT", payload: data });
      alert("Starred the restaurant successfully.");
    },
    [authState.token, dispatch],
  );

  const onUpdateRestaurant = useCallback(
    async (id, data) => {
      const responseStatus = await updateRestaurantName(
        id,
        data,
        authState.token,
      );

      if (responseStatus !== 200) {
        alert("Updating failed");
        return;
      }
      dispatch({ type: "UPDATE_RESTAURANT_NAME", payload: { id, ...data } });
    },
    [authState.token, dispatch],
  );

  return (
      <div id="restaurants">
        <PageTitle>Restaurants</PageTitle>
        <CardList>
          {Array.isArray(restaurants) && restaurants.map((restaurant,index) => (
              <Restaurant key={restaurant.id}
              style={{"--i":index}}
              data-animate
                restaurant={restaurant}
                isOwner={restaurant.created_by === authState.user?.id}
                onDeleteRestaurant={onDeleteRestaurant}
                onStarRestaurant={onStarRestaurant}
                onUpdateRestaurant={onUpdateRestaurant}
              />
          ))}
        </CardList>
      </div>
  );
};

export default Restaurants;
