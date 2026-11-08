export function currentUserId(): number | null {
    try{
        const token = localStorage.getItem("token");
        if(!token) return null;
        const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g,"/");
        return Number(JSON.parse(atob(payload)).sub);
    }catch{
        return null;
    }
}