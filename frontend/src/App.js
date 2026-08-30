import { useReducer } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import "./App.css";
import Restaurants from "./components/restaurants";
import StarredRestaurants from "./components/starredRestaurants";
import RestaurantsContext, {
  RestaurantsInitialState,
  RestaurantsReducer,
} from "./provider/restaurants";
import AuthContext, { AuthInitialState, AuthReducer } from "./provider/auth";
import Login from "./components/auth/Login";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import GlobalStyle from "./GlobalStyle";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";

function App() {
  const [state, dispatch] = useReducer(
    RestaurantsReducer,
    RestaurantsInitialState,
  );
  const [authState, authDispatch] = useReducer(AuthReducer, AuthInitialState);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <AuthContext.Provider value={{ authState, authDispatch }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <RestaurantsContext.Provider value={{ state, dispatch }}>
                    <Navbar/>
                    <h1>My Restaurant List</h1>
                    <Restaurants />
                    <StarredRestaurants />
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
