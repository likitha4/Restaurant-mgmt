const API = process.env.NEXT_PUBLIC_DONATION_API_URL ?? "http://localhost:8001/graphql"

export async function gql(query: string, variables:Record<string, unknown>={}){
    const token= localStorage.getItem("token")
    if(!token) throw new Error("Please log in to Fork Find ");
    const res = await fetch(API, {
        method:"POST",
        headers:{"Content-Type":"application/json", Authorization:`Bearer ${token}`},
        body:JSON.stringify({query, variables}),
    });
    const json= await res.json();
    if(json.errors) throw new Error(json.errors[0].message);
    return json.data;
}