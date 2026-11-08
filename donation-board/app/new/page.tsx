"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {gql} from "../lib/gql";
type Restaurant = { id: number; name: string; city: string | null };
const CREATE = `
            mutation($restaurantId: Int!,$foodType: String!, $quantityKg: Float!, $hours: Int!) {
            createDonation(restaurantId:$restaurantId,foodType: $foodType, quantityKg:$quantityKg, hoursUntilSpoil: $hours )  {id}  
            }`
export default function NewDonation(){
    const [restaurants, setRestaurants]= useState<Restaurant[]>([]);
    const [restaurantId, setRestaurantId]= useState("");
    const [foodType, setFoodType]= useState("");
    const [quantityKg, setQuantityKg]= useState("");
    const [hours, setHours]= useState("");
    const [message, setMessage]= useState("");
    const router = useRouter();

    useEffect(()=>{
        gql("{myRestaurants {id name city}}").then((d)=>{
            setRestaurants(d.myRestaurants);
            if(d.myRestaurants.length) setRestaurantId(String(d.myRestaurants[0].id));
        })
        .catch((e)=>setMessage(e.message));
    },[]);

async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    setMessage("Posting...");
    try{
        await gql(CREATE,{restaurantId:Number(restaurantId),foodType, quantityKg:Number(quantityKg), hours:Number(hours), });
        setMessage("Posted!");
        router.push("/");
    }catch(err){
        setMessage(err instanceof Error ? err.message :"Something went wrong");
    }
}

return (
    <main>
        <Link href="/">All donations</Link>
        <h1> Post a donation </h1>
        <form onSubmit={handleSubmit} className="dn-form">
            <label>Restaurant 
                <select value ={restaurantId} onChange={(e)=>setRestaurantId(e.target.value)} required>
                    {restaurants.map((r)=>(
                        <option key ={r.id} value ={r.id}>{r.name} {r.city ?`.${r.city}`:""}</option>
                    ))}
                </select>
            </label>
            <label>Food type
                <input value ={foodType} onChange={(e)=>setFoodType(e.target.value)} required/>
            </label>
            <label> Quantity (kg)
                <input type="number" min ="0.1" step ="0.1" value ={quantityKg}
                onChange={(e)=>setQuantityKg(e.target.value)} required/>
            </label>
            <label> Safe to eat (for hours)
                <input type="number" min ="1" step ="1" value ={hours}
                onChange={(e)=>setHours(e.target.value)} required/>
            </label>
            <button type="submit" > Post donation</button>
        </form>
        <p>{message}</p>
    </main>
)
}