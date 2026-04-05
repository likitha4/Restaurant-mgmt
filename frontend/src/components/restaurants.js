import React, { useContext, useEffect, useState } from "react";
import RestaurantsContext from "../provider/restaurants";
import { API_ENDPOINT } from "../api/index";

function Restaurants() {
  const { state, dispatch } = useContext(RestaurantsContext);
  const [newRestaurantName, setNewRestaurantName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Load restaurants on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_ENDPOINT}/api/restaurants`);
        if (!response.ok) throw new Error("Failed to load restaurants");
        const data = await response.json();
        dispatch({
          type: "LOADED_RESTAURANTS",
          payload: data,
        });
        setError(null);
      } catch (err) {
        console.error("[v0] Error loading restaurants:", err);
        setError("Failed to load restaurants. Make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [dispatch]);

  const handleAddRestaurant = async (e) => {
    e.preventDefault();
    if (!newRestaurantName.trim()) {
      setError("Restaurant name cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/api/restaurants`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newRestaurantName }),
      });

      if (!response.ok) throw new Error("Failed to add restaurant");
      const newRestaurant = await response.json();

      dispatch({
        type: "ADD_NEW_RESTAURANT",
        payload: newRestaurant,
      });

      setNewRestaurantName("");
      setError(null);
    } catch (err) {
      console.error("[v0] Error adding restaurant:", err);
      setError("Failed to add restaurant");
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/api/restaurants/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete restaurant");

      dispatch({
        type: "DELETE_RESTAURANT",
        payload: id,
      });
      setError(null);
    } catch (err) {
      console.error("[v0] Error deleting restaurant:", err);
      setError("Failed to delete restaurant");
    }
  };

  const handleUpdateRestaurant = async (id) => {
    if (!editingName.trim()) {
      setError("Restaurant name cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${API_ENDPOINT}/api/restaurants/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newName: editingName }),
      });

      if (!response.ok) throw new Error("Failed to update restaurant");

      dispatch({
        type: "UPDATE_RESTAURANT_NAME",
        payload: { id, newName: editingName },
      });

      setEditingId(null);
      setEditingName("");
      setError(null);
    } catch (err) {
      console.error("[v0] Error updating restaurant:", err);
      setError("Failed to update restaurant");
    }
  };

  const handleStarRestaurant = (restaurant) => {
    dispatch({
      type: "STAR_RESTAURANT",
      payload: { ...restaurant, comment: "" },
    });
  };

  if (loading) {
    return <div className="section"><p>Loading restaurants...</p></div>;
  }

  return (
    <div className="section">
      <h2>All Restaurants</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleAddRestaurant} className="add-restaurant-form">
        <input
          type="text"
          value={newRestaurantName}
          onChange={(e) => setNewRestaurantName(e.target.value)}
          placeholder="Enter restaurant name"
          className="input-field"
        />
        <button type="submit" className="btn btn-primary">
          Add Restaurant
        </button>
      </form>

      <div className="restaurants-list">
        {state.restaurants && state.restaurants.length > 0 ? (
          state.restaurants.map((restaurant) => (
            <div key={restaurant.id} className="restaurant-item">
              {editingId === restaurant.id ? (
                <div className="edit-mode">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    className="input-field"
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdateRestaurant(restaurant.id)}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="view-mode">
                  <span className="restaurant-name">{restaurant.name}</span>
                  <div className="actions">
                    <button
                      onClick={() => {
                        setEditingId(restaurant.id);
                        setEditingName(restaurant.name);
                      }}
                      className="btn btn-secondary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleStarRestaurant(restaurant)}
                      className="btn btn-star"
                    >
                      ⭐ Star
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No restaurants yet. Add one to get started!</p>
        )}
      </div>
    </div>
  );
}

export default Restaurants;
