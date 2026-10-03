import React from "react";
import AuthContext from "../../provider/auth";
import { useContext} from "react";
import { Navigate } from "react-router-dom";
export const ProtectedRoute=({children})=>{
    const {authState}= useContext(AuthContext);
    if(authState.isLoading) return <div>Checking your session...</div>
    if(authState.user) return children ;
    return <Navigate to="/login"  replace/>;

}
