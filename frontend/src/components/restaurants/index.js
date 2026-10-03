import React, { useEffect, useContext, useCallback, useState } from "react";
import {
  deleteRestaurant,
  getRestaurants,
  updateRestaurantName,
  starRestaurant,
  getCities
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
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities]= useState([])
  const [isFilterOpen, setIsFilterOpen]= useState(false);
  useScrollAnimation(restaurants);

  useEffect(() => {
    async function fetchData() {
      try{
      const restaurantsData = await getRestaurants(selectedCity);
      dispatch({ type: "LOADED_RESTAURANTS", payload: restaurantsData });
    }catch(error){
      console.error("Failed to fetch restaurants:", error);
    }
  }
    fetchData();
  }, [selectedCity, dispatch]);

  useEffect(()=>{
    async function fetchCities(){
      try{
        const citiesData = await getCities();
        setCities(citiesData);
      }catch(error){
        console.error("Faile dto fetch cities", error);
      }
    }
  fetchCities();
  },[])
  
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
        <div className= "restaurant-toolbar">
        <PageTitle>Restaurants</PageTitle>
        <button type="button" className="filter-button" onClick={()=>setIsFilterOpen((isOpen)=>!isOpen)} aria-expanded={isFilterOpen} aria-controls="city-filter">
          <span className="filter-lines" aria-hidden="true">
            <span/>
            <span/>
            <span/>
          </span>
          <span>Filter</span>
        </button>
        </div>

        {isFilterOpen && (
          <div id= "city-filter" className="city-filter">
            <label htmlFor="city-select"> Choose a city</label>
            <select id="city-select" value={selectedCity} onChange={(event)=>setSelectedCity(event.target.value)}>
              <option value= "">All cities</option>
              {cities.map((city)=>(
                <option key= {city.city} value= {city.city}>{city.city}</option>
              ))}
            </select>
            </div>
        )}
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
