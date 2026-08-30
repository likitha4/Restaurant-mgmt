import { API_ENDPOINT } from ".";


export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_ENDPOINT}/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newUser = await response.json();
    if(!response.ok){
      throw new Error(newUser.message)
    }
    return newUser;
  };
  export const loginUser= async(email, password)=>{
    const response= await fetch(`${API_ENDPOINT}/auth/login`, {
        method:"POST",
        body:JSON.stringify({email,password}),
        headers:{"Content-Type":"application/json"}
    });
    const loggedInUser= await response.json();
    if(!response.ok){
      throw new Error(loggedInUser.message)
    }
    return loggedInUser;
  };
