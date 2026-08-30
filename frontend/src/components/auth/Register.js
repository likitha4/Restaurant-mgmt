import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import AuthContext from "../../provider/auth";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledError,StyledForm,StyledInput } from "./AuthStyles";
import { registerUser } from "../../api/auth";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
const Register = () => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm();
  const [serverError, setServerError] = useState(null);
  const { authDispatch } = useContext(AuthContext);
  const emailId = useId();
  const passwordId = useId();
  const nameId= useId();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setServerError(null);
      const response = await registerUser(data.name, data.email, data.password);
      authDispatch({
        type: "AUTH_SUCCESS",
        payload: { user: response.user, token: response.token },
      });
      localStorage.setItem("token", response.token);
      reset();
      navigate("/");
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <AuthLayout bgImage="/images/food.jpg" heading="Find your next favorite food spot" text ="Join Fork find to discover restaurants, save favorites and share honest reviews.">
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {serverError && <StyledError>{serverError}</StyledError>}
        <label htmlFor={nameId}>Name</label>
        <StyledInput
          id={nameId}
          type="text"
          {...register("name")}
        ></StyledInput>
        <label htmlFor={emailId}>Email</label>
        <StyledInput
          id={emailId}
          type="text"
          {...register("email")}
        ></StyledInput>
        <label htmlFor={passwordId}>Password</label>
        <StyledInput
          id={passwordId}
          type="password"
          {...register("password")}
        ></StyledInput>
        <StyledButton> Sign Up </StyledButton>
        <p>Already have an account ? <Link to ="/login">Log in </Link></p>
      </StyledForm>
      </AuthLayout>
  );
};
export default Register;
