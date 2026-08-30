import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../api/auth";
import { useContext } from "react";
import AuthContext from "../../provider/auth";
import { useId } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton,StyledError,StyledForm,StyledInput,StyledLabel } from "./AuthStyles";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState(null);
  const { authDispatch } = useContext(AuthContext);
  const emailId = useId();
  const passwordId = useId();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setServerError(null);
      const response = await loginUser(data.email, data.password);
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
    <AuthLayout bgImage="/images/restaurant.jpg" heading="Welcome back" text="Log in to see your saved favorites and pick up where you left off.">
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {serverError && <StyledError>{serverError}</StyledError>}
      <StyledLabel htmlFor={emailId}>Email</StyledLabel>
      <StyledInput
        id={emailId}
        type="text"
        {...register("email")}
      ></StyledInput>
      <StyledLabel htmlFor={passwordId}>Password</StyledLabel>
      <StyledInput
        id={passwordId}
        type="password"
        {...register("password")}
      ></StyledInput>
      <StyledButton> Sign in </StyledButton>
      <p>Don't have an account ?<Link to="/register">Sign up</Link></p>
    </StyledForm>
    </AuthLayout>
  );
};
export default Login;
