import React, { useContext } from "react";
import RestaurantsContext from "../provider/restaurants";

function StarredRestaurants() {
  const { state, dispatch } = useContext(RestaurantsContext);

  const handleUnstarRestaurant = (id) => {
    dispatch({
      type: "UNSTAR_RESTAURANT",
      payload: id,
    });
  };

  const handleUpdateComment = (id, newComment) => {
    dispatch({
      type: "UPDATE_STARRED_RESTAURANT_COMMENT",
      payload: { id, newComment },
    });
  };

  return (
    <div className="section">
      <h2>Starred Restaurants</h2>

      {state.starredRestaurants && state.starredRestaurants.length > 0 ? (
        <div className="starred-restaurants-list">
          {state.starredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="starred-restaurant-item">
              <h3>{restaurant.name}</h3>
              <div className="comment-section">
                <textarea
                  value={restaurant.comment || ""}
                  onChange={(e) =>
                    handleUpdateComment(restaurant.id, e.target.value)
                  }
                  placeholder="Add a comment about this restaurant..."
                  className="textarea-field"
                />
              </div>
              <button
                onClick={() => handleUnstarRestaurant(restaurant.id)}
                className="btn btn-danger"
              >
                Remove Star
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No starred restaurants yet. Star a restaurant to add it here!</p>
      )}
    </div>
  );
}

export default StarredRestaurants;
