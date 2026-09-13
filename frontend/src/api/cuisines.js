import { API_ENDPOINT } from ".";

export const getCuisines= async()=>{
    const response= await fetch(`${API_ENDPOINT}/cuisines`)
    const cuisines= await response.json();
    return cuisines;

};