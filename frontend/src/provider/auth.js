import React from "react";

export const AuthInitialState=  {user:null, token:null, isLoading:true};

export const AuthReducer=(state=AuthInitialState, action)=>{
    switch(action.type){
        case "AUTH_SUCCESS":{
            return {...state, user:action.payload.user, token:action.payload.token , isLoading:false};
        }
        case "LOGOUT":{
            return {...state, user:null, token:null};
        }
        case "AUTH_CHECK_COMPLETE":{
            return {...state, isLoading:false}
        }
        default:
            return state;
    }
}
const AuthContext= React.createContext({
    authState: AuthInitialState,
    authDispatch:(action)=>{},
})
export default AuthContext;