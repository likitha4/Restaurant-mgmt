import React, { useContext, useEffect, useCallback } from "react";
import StarredRestaurant from "./StarredRestaurant";
import {
  getStarredRestaurants,
  unstarRestaurant,
  updateComment,
  updateStarredStatus,
} from "../../api/starredRestaurants";
import RestaurantsContext from "../../provider/restaurants";
import AuthContext from "../../provider/auth";
import { CardList } from "../restaurants/RestaurantCardStyles";
import { PageTitle } from "../restaurants/RestaurantFormStyles";
import useScrollAnimation from "../../hooks/useScrollAnimation";
const StarredRestaurants = () => {
  const {
    state: { starredRestaurants },
    dispatch,
  } = useContext(RestaurantsContext);
  const { authState } = useContext(AuthContext);
 useScrollAnimation(starredRestaurants);
  useEffect(() => {
    async function fetchData() {
      const restaurantsData = await getStarredRestaurants(authState.token);
      dispatch({
        type: "LOADED_STARRED_RESTAURANTS",
        payload: restaurantsData,
      });
    }
    fetchData();
  }, [dispatch, authState.token]);

  const onUnstarRestaurant = useCallback(
    async (id) => {
      const responseStatus = await unstarRestaurant(id, authState.token);
      if (responseStatus !== 200) {
        alert("Updating failed");
        return;
      }
      dispatch({
        type: "UNSTAR_RESTAURANT",
        payload: id,
      });
    },
    [authState.token, dispatch],
  );

  const onUpdateComment = useCallback(
    async (restaurant_id, newComment) => {
      const responseStatus = await updateComment(
        restaurant_id,
        newComment,
        authState.token,
      );
      if (responseStatus !== 200) {
        alert("Updating failed");
        return;
      }
      dispatch({
        type: "UPDATE_STARRED_RESTAURANT_COMMENT",
        payload: { restaurant_id, newComment },
      });
    },
    [authState.token, dispatch],
  );

  const onUpdateStatus= useCallback(
    async(restaurant_id, newStatus)=>{
      try{
        await updateStarredStatus(restaurant_id, newStatus,authState.token);
        dispatch({type:"UPDATE_STARRED_RESTAURANT_STATUS", payload:{restaurant_id,newStatus},
        });
      }catch(error){
        alert("Failed to update status");
      }
    
    },[authState.token, dispatch],
  );

  return (
    <>
      <PageTitle>
        <span role="img" aria-label="star">
          ⭐
        </span>
        Favorite Restaurants
        <span role="img" aria-label="star">
          ⭐
        </span>
      </PageTitle>
      <CardList>
        {starredRestaurants.map((restaurant,index) => (
            <StarredRestaurant key= {restaurant.restaurant_id} style={{"--i":index}}
            data-animate
              restaurant={restaurant}
              onUnstarRestaurant={onUnstarRestaurant}
              onUpdateComment={onUpdateComment}
              onUpdateStatus= {onUpdateStatus}
            />
          
        ))}
      </CardList>
    </>
  );
};

export default StarredRestaurants;
