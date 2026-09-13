import React, { useContext, useEffect, useState } from "react";
import { addNewRestaurant } from "../../api/restaurants";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getCuisines } from "../../api/cuisines";
import AuthContext from "../../provider/auth";
import RestaurantsContext from "../../provider/restaurants";
import {
  FieldInput,
  FieldGroup,
  FieldLabel,
  FormCard,
  SubmitButton,
  CuisineGrid,
  FormTitle,
  CuisinePill,
} from "./RestaurantFormStyles";

function AddRestaurant() {
  const { authState } = useContext(AuthContext);
  const { reset, handleSubmit, register } = useForm();
  const [cuisines, setCuisines] = useState([]);
  const navigate = useNavigate();
  const { dispatch } = useContext(RestaurantsContext);
  useEffect(() => {
    async function fetchData() {
      const cuisinesData = await getCuisines();
      setCuisines(cuisinesData);
    }
    fetchData();
  }, []);

  const onAddNewRestaurant = async (data) => {
    const newRestaurant = await addNewRestaurant(data, authState.token);
    reset();
    dispatch({ type: "ADD_NEW_RESTAURANT", payload: newRestaurant });
    navigate("/");
  };

  return (
    <FormCard>
      <FormTitle>Add a New Restaurant!</FormTitle>
      <form onSubmit={handleSubmit(onAddNewRestaurant)}>
        <FieldGroup>
          <FieldLabel>Name</FieldLabel>
          <FieldInput {...register("name")} />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Address </FieldLabel>
          <FieldInput {...register("address")} />
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Description</FieldLabel>
          <FieldInput {...register("description")} />
        </FieldGroup>
        <FieldLabel>Cuisines</FieldLabel>
        <CuisineGrid>
          {cuisines.map((cuisine) => (
            <CuisinePill key={cuisine.id}>
              <input
                type="checkbox"
                value={cuisine.id}
                {...register("cuisineIds")}
              />
              {cuisine.name}
            </CuisinePill>
          ))}
        </CuisineGrid>
        <SubmitButton type="submit">Save Restaurant</SubmitButton>
      </form>
    </FormCard>
  );
}

export default AddRestaurant;
