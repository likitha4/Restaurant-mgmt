import React from "react";

export const AuthInitialState=  {user:null, token:null};

export const AuthReducer=(state=AuthInitialState, action)=>{
    switch(action.type){
        case "AUTH_SUCCESS":{
            return {...state, user:action.payload.user, token:action.payload.token };
        }
        case "LOGOUT":{
            return {...state, user:null, token:null};
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