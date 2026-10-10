import { API_ENDPOINT } from "."
export const generateDescription = async ({name, city, notes}, token)=>{
    const res = await fetch(`${API_ENDPOINT}/ai/generate-description`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
        },
        body:JSON.stringify({name, city, notes})
    });
    if(!res.ok){
        const err= await res.json().catch(()=>({}));
        throw new Error(err.message || "Failed to generate description")
    }
    return res.json();
};