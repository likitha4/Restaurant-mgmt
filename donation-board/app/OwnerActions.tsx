"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gql } from "./lib/gql";
import { currentUserId } from "./lib/token";

const DELETE = `mutation ($id:Int!) {deleteDonation(donationId: $id)}`;
const UPDATE = `mutation ($id:Int!, $food:String, $kg: Float){
 updateDonation(donationId:$id, foodType:$food, quantityKg:$kg){id}}`;

type Props = {
  id: number;
  ownerId: number | null;
  foodType: string;
  quantityKg: number;
};

export default function OwnerActions({
  id,
  ownerId,
  foodType,
  quantityKg,
}: Props) {
  const router = useRouter();
  const [isOwner, setIsOwner] = useState(false);
  const [editing, setEditing] = useState(false);
  const [food, setFood] = useState(foodType);
  const [kg, setKg] = useState(String(quantityKg));
  const [error, setError] = useState("");

  useEffect(() => {
    setIsOwner(ownerId !== null && currentUserId() === ownerId);
  }, [ownerId]);
  if (!isOwner) return null;

  function startEdit() {
    setFood(foodType);
    setKg(String(quantityKg));
    setError("");
    setEditing(true);
  }
  async function save() {
    try {
      await gql(UPDATE, { id, food: food || null, kg: kg ? Number(kg) : null });
      setEditing(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed");
    }
  }
  async function remove() {
    if (!confirm("Delete this donation?")) return;
    try {
      await gql(DELETE, { id });
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Deletion failed");
    }
  }

  if (editing) {
    return (
      <div className="dn-edit">
        <input value={food} onChange={(e) => setFood(e.target.value)} />
        <input
          type="number"
          min="0.1"
          step="0.1"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
        />
        <div className="dn-actions">
          <button className="dn-btn" onClick={save}>
            Save
          </button>
          <button className="dn-btn" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
        {error && <p>{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <div className="dn-actions">
        <button className="dn-btn" onClick={startEdit}>
          {" "}
          Edit
        </button>
        <button className="dn-btn dn-danger" onClick={remove}>
          Delete
        </button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}
