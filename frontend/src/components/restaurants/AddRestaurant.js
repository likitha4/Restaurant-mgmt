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
  FieldError,
  GenerateButton,
} from "./RestaurantFormStyles";
import { generateDescription } from "../../api/ai";

function AddRestaurant() {
  const { authState } = useContext(AuthContext);
  const { reset, handleSubmit, register, setValue, watch,  formState:{errors}} = useForm();
  const [cuisines, setCuisines] = useState([]);
  const [isGenerating, setIsGenerating]= useState(false);
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
  const handleGenerateDescription = async()=>{
    const name= watch("name");
    const city = watch("city");
    if(!name?.trim()){
      alert("Please enter the restaurant name first");
      return;
    }
    const payload = {name:name.trim()};
    if(city?.trim()){
      payload.city= city.trim();
    }
    try{
      setIsGenerating(true);
      const data= await generateDescription(payload, authState.token);
 setValue("description", data.description, {shouldValidate:true});
   }catch(err){
      alert(err.message);
    }finally{
      setIsGenerating(false);
    }
  };
  return (
    <FormCard>
      <FormTitle>Add a New Restaurant!</FormTitle>
      <form onSubmit={handleSubmit(onAddNewRestaurant)}>
        <FieldGroup>
          <FieldLabel>Name</FieldLabel>
          <FieldInput {...register("name", {required: "Name is required"})} />
          {errors.name &&<FieldError> {errors.name.message}</FieldError>}
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Address </FieldLabel>
          <FieldInput {...register("address",{required: "Address is required"})} />
          {errors.address && <FieldError> {errors.address.message}</FieldError>}
        </FieldGroup>
        <FieldGroup>
          <FieldLabel htmlFor="restaurant-city">City</FieldLabel>
          <FieldInput id="restaurant-city" placeholder="For Example: Hyderabad"{...register("city",{ required:"City is required",})}/>
          {errors.city && <FieldError>{errors.city.message}</FieldError>}
        </FieldGroup>
        <FieldGroup>
          <FieldLabel>Description</FieldLabel>
          <FieldInput {...register("description",{required: "Description is required"})} />
          {errors.description && <FieldError> {errors.description.message}</FieldError>}
        <GenerateButton type="button" onClick={handleGenerateDescription} disabled={isGenerating}>
          {isGenerating?"Generating ...":"✨ Generate with AI"}
        </GenerateButton>
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
