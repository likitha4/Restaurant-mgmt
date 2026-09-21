import { API_ENDPOINT } from ".";

const BASE_API_ROUTE = `${API_ENDPOINT}/restaurants/starred`;

export const getStarredRestaurants = async (token) => {
  const response = await fetch(`${BASE_API_ROUTE}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });
  const result = await response.json();
 console.log(result);
  return result;
};

export const unstarRestaurant = async (id,token) => {
  const response =  await fetch(`${BASE_API_ROUTE}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  return response.status;
};

export const updateComment = async (restaurant_id, newComment,token) => {
  const response = await fetch(`${BASE_API_ROUTE}/${restaurant_id}`, {
    method: "PUT",
    body: JSON.stringify({

      newComment,
    }),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    },
  });

  return response.status;
};

export const updateStarredStatus = async(restaurant_id, status,token)=>{
  const result= await fetch(`${BASE_API_ROUTE}/${restaurant_id}/status`,{
    method:"PUT",
    headers:{
      "Content-Type": "application/json",
      "Authorization":`Bearer ${token}`,
    },
    body:JSON.stringify({status}),

  })
  if(!result.ok) {
    const errorData= await result.json().catch(()=>({}));
    throw new Error(errorData.message || "Failed to update Status");
  }
    return result.json();
}