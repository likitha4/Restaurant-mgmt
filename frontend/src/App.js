import { useEffect, useReducer } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./App.css";
import RestaurantsContext, {
  RestaurantsInitialState,
  RestaurantsReducer,
} from "./provider/restaurants";
import AuthContext, { AuthInitialState, AuthReducer } from "./provider/auth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import GlobalStyle from "./GlobalStyle";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import { Suspense } from "react";
import { getCurrentUser } from "./api/auth";
const Login = React.lazy(() => import("./components/auth/Login"));
const Restaurants = React.lazy(() => import("./components/restaurants"));
const StarredRestaurants = React.lazy(
  () => import("./components/starredRestaurants"),
);
const AddRestaurant = React.lazy(
  () => import("./components/restaurants/AddRestaurant"),
);

function App() {
  const [state, dispatch] = useReducer(
    RestaurantsReducer,
    RestaurantsInitialState,
  );
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitialState);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      authDispatch({type:"AUTH_CHECK_COMPLETE"});
      return;
    }
    async function restoreSession() {
      try {
        const data = await getCurrentUser(token);
        authDispatch({
          type: "AUTH_SUCCESS",
          payload: { user: data.user, token }
        });
      } catch (error) {
        localStorage.removeItem("token");
      }finally{
        authDispatch({type:"AUTH_CHECK_COMPLETE"});
      }
    }
    restoreSession();
  }, [authDispatch]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthContext.Provider value={{ authState, authDispatch }}>
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              }
            />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <RestaurantsContext.Provider value={{ state, dispatch }}>
                    <Navbar />
                    <Suspense fallback={<div>Loading... </div>}>
                      <Restaurants />
                    </Suspense>
                  </RestaurantsContext.Provider>
                </ProtectedRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <RestaurantsContext.Provider value={{ state, dispatch }}>
                    <Navbar />
                    <Suspense fallback={<div>Loading... </div>}>
                      <StarredRestaurants />
                    </Suspense>
                  </RestaurantsContext.Provider>
                </ProtectedRoute>
              }
            />

            <Route
              path="/restaurants/new"
              element={
                <ProtectedRoute>
                  <RestaurantsContext.Provider value={{ state, dispatch }}>
                    <Navbar />
                    <Suspense fallback={<div>Loading... </div>}>
                      <AddRestaurant />
                    </Suspense>
                  </RestaurantsContext.Provider>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
