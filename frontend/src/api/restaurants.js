import { API_ENDPOINT } from ".";

export const getRestaurants = async () => {
  const response = await fetch(`${API_ENDPOINT}/restaurants`);
  const restaurants = await response.json();

  return restaurants;
};

export const addNewRestaurant = async (data, token) => {
  const response = await fetch(`${API_ENDPOINT}/restaurants`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const newRestaurant = await response.json();
  return newRestaurant;
};

export const deleteRestaurant = async (id, token) => {
  const response = await fetch(`${API_ENDPOINT}/restaurants/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.status;
};

export const updateRestaurantName = async (id, data,token) => {
  const response = await fetch(`${API_ENDPOINT}/restaurants/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return response.status;
};

export const starRestaurant = async (restaurantId, token) => {
  const response = await fetch(`${API_ENDPOINT}/restaurants/starred`, {
    method: "POST",
    body: JSON.stringify({
      restaurantId,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const newStarredRestaurant = await response.json();

  return { status: response.status, data: newStarredRestaurant };
};
