import React from "react";
import AuthContext from "../../provider/auth";
import { useContext} from "react";
import { Navigate } from "react-router-dom";
export const ProtectedRoute=({children})=>{
    const {authState}= useContext(AuthContext);
    if(authState.user){
        return children ;
    }
    else
    return <Navigate to="/register" />

}
