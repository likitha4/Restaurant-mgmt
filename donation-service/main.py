from datetime import datetime, timedelta, timezone
import base64, hashlib, hmac, json, time
from strawberry.types import Info
import os
from typing import Optional
from sqlalchemy import create_engine, text
import strawberry
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from strawberry.fastapi import GraphQLRouter

engine =create_engine(
    os.environ.get("DATABASE_URL","postgresql+psycopg2://likhithagollapalli@localhost:5432/restaurant_mgmt"),
    pool_pre_ping= True,
)
JWT_SECRET = os.environ.get("JWT_SECRET","")

def verify_token(token:str):
    try:
        header, payload, sig = token.split(".")
        mac = hmac.new(JWT_SECRET.encode(), f"{header}.{payload}".encode(), hashlib.sha256).digest()
        expected = base64.urlsafe_b64encode(mac).rstrip(b"=").decode()
        if not hmac.compare_digest(sig, expected):
            return None
        data = json.loads(base64.urlsafe_b64decode(payload + "=" * (-len(payload) % 4)))
        if data["exp"]< time.time() * 1000:
            return None
        return data
    except Exception:
        return None


def current_user_id(info: Info) ->int:
    auth = info.context["request"].headers.get("authorization","")
    if not auth.startswith("Bearer "):
        raise Exception("Not logged in")
    data = verify_token(auth[7:].strip())
    if data is None:
        raise Exception("Invalid or expired token")
    return int(data["sub"])




@strawberry.type
class Donation:
    id:int
    restaurant_id: int
    restaurant_name: str
    city: Optional [str]
    owner_name: Optional [str]
    owner_id: Optional[int]
    food_type: str
    quantity_kg: float
    expires_at: datetime

def get_donation(donation_id:int)-> Donation:
    with engine.connect() as conn:
            r= conn.execute(
                text("select d.id, d.restaurant_id,r.name as restaurant_name , r.city, u.name as owner_name,r.created_by as owner_id, d.food_type, d.quantity_kg, d.expires_at from donations d join restaurants r on r.id= d.restaurant_id left join users u on u.id=r.created_by where d.id = :id """),
                {"id":donation_id}).first()
    return Donation(id = r.id, restaurant_id= r.restaurant_id, restaurant_name = r.restaurant_name,
                    city = r.city , owner_name= r.owner_name, owner_id = r.owner_id, food_type = r.food_type, quantity_kg = float(r.quantity_kg), expires_at = r.expires_at)
@strawberry.type
class Restaurant:
    id: int
    name:str
    city: Optional[str]

@strawberry.type
class Query:
    @strawberry.field
    def donations(self)->list[Donation]:
        with engine.connect() as conn:
            rows= conn.execute(
                text("select d.id, d.restaurant_id,r.name as restaurant_name , r.city, u.name as owner_name, r.created_by as owner_id, d.food_type, d.quantity_kg, d.expires_at from donations d join restaurants r on r.id= d.restaurant_id left join users u on u.id=r.created_by where d.expires_at>now() order by d.expires_at")
            ).all()
        return [
            Donation(
                id=r.id,
                restaurant_id=r.restaurant_id,
                restaurant_name=r.restaurant_name,
                food_type=r.food_type,
                city= r.city,
                owner_name= r.owner_name,
                owner_id = r.owner_id,
                quantity_kg=float(r.quantity_kg),
                expires_at=r.expires_at,
            )
            for r in rows
        ]

    @strawberry.field
    def me(self, info: Info)->int:
        return current_user_id(info)
   
    @strawberry.field
    def my_restaurants(self, info:Info)->list[Restaurant]:
     user_id = current_user_id(info)
     with engine.connect() as conn:
         rows = conn.execute(
             text("SELECT id, name, city  from restaurants where created_by = :uid order by name"),{"uid":user_id},
         ).all()
     return [Restaurant(id=r.id, name=r.name, city=r.city) for r in rows]

@strawberry.type
class Mutation:
    @strawberry.mutation
    def create_donation(
        self, info: Info, restaurant_id :int, food_type:str, quantity_kg: float, hours_until_spoil:int)->Donation:
        user_id= current_user_id(info)
        if quantity_kg<= 0 or hours_until_spoil<=0:
            raise Exception("Quantity and hours must be greater than zero")
        with engine.begin() as conn:
            owner = conn.execute(text("SELECT created_by from restaurants where id = :rid"),{"rid":restaurant_id}).first()
            if owner is None:
                raise Exception("Restaurant not found")
            if owner.created_by != user_id:
                raise Exception("You can only post donations for your own restaurant")
            new_id = conn.execute(text("""insert into donations (restaurant_id, food_type, quantity_kg, expires_at) values (:rid, :food, :kg, now()+make_interval(hours=>:h))returning id """),{
                     "rid":restaurant_id,"food":food_type, "kg":quantity_kg, "h":hours_until_spoil},
            ).scalar()
        return get_donation(new_id)

    @strawberry.mutation
    def delete_donation(self, info:Info, donation_id:int)->bool:
        user_id= current_user_id(info)
        with engine.begin() as conn:
            result = conn.execute(
                text("""DELETE from donations d using restaurants r where d.id = :id and d.restaurant_id = r.id and r.created_by = :uid"""),{"id":donation_id, "uid":user_id}
            )
            if result.rowcount == 0:
                raise Exception("Donation is not found, or it isn't yours")
            return True
    
    @strawberry.mutation
    def update_donation( self,info:Info, donation_id:int, food_type:Optional[str]=None, quantity_kg: Optional[float] =None,) -> Donation:
        user_id= current_user_id(info)
        if quantity_kg is not None and quantity_kg<=0:
            raise Exception("Quantity cannot be less than or equal to 0 ")
        if food_type is None and quantity_kg is None:
            raise Exception ("Modify the food type or quantity to update the donation")
        with engine.begin() as conn:
            row = conn.execute(
                text("""update donations d set food_type = coalesce(:food, d.food_type),quantity_kg = coalesce(:kg, d.quantity_kg) from restaurants r where d.id = :id and d.restaurant_id = r.id and r.created_by = :uid returning d.id """ ),{
                    "id":donation_id, "uid":user_id, "food": food_type, "kg" :quantity_kg},
            ).first()
        if row is None:
            raise Exception("Donation not found or it isn't yours to update")
        return get_donation(row.id)



schema  = strawberry.Schema(query=Query, mutation=Mutation)
app=FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins = os.environ.get("CORS_ORIGINS","http://localhost:3001,http://localhost:3000").split(","),
    allow_methods = ["GET","POST","OPTIONS"],
    allow_headers =["Authorization","Content-Type"],
)
app.include_router(GraphQLRouter(schema), prefix="/graphql")
