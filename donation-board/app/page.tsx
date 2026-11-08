import { Suspense } from "react";
import {connection} from "next/server";
import OwnerActions from "./OwnerActions";
type Donation = {
  id: number;
  restaurantName: string;
  city: string | null;
  foodType: string;
  quantityKg: number;
  expiresAt: string;
  ownerId: number | null;
};
import Link from "next/link"
function timeLeft(expiresAt: string) {
  const ms = new Date(expiresAt).getTime() - Date.now();
  const hours = Math.floor(ms / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  return { ms, label: hours > 0 ? `${hours}h ${mins}m left` : `${mins}m left` };
}
async function getDonations() {
  const res = await fetch(
    process.env.DONATION_API_URL ?? "http://localhost:8001/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query:
          "{donations {id restaurantName city foodType quantityKg expiresAt ownerId}}",
      }),
      cache: "no-store",
    },
  );
  const json = await res.json();
  return json.data.donations;
}

async function DonationList() {
  // console.log("styles:", styles);
  await connection();
  const donations: Donation[] = await getDonations();
  if (donations.length == 0) {
    return <p className="dn-empty">No donations available right now.</p>;
  }
  return (
    <div className="dn-grid">
      {donations.map((d) => {
        const t = timeLeft(d.expiresAt);
        return (
          <article key={d.id} className="dn-card">
            <span className={t.ms < 7_200_000 ? "dn-urgent" : "dn-badge"}>
              {t.label}
            </span>
            <h2>{d.foodType}</h2>
            <p className="dn-kg">{d.quantityKg} Kg</p>
            <p className="dn-where">
              {d.restaurantName} {d.city ? ` ${d.city}` : ""}{" "}
            </p>
            <p className="dn-until">
              Pick up before {" "}
              {new Date(d.expiresAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
            <OwnerActions id={d.id} ownerId={d.ownerId} foodType={d.foodType} quantityKg={d.quantityKg} />
          </article>
        );
      })}
    </div>
  );
}
export default async function Home() {
  return (
    <main>
      <h1> Available Donations</h1>
      <div className="dn-links">
      <Link href="/new">Post a donation</Link>
      </div>
      <Suspense fallback={<p>Loading donations...</p>}>
        <DonationList></DonationList>
      </Suspense>
    </main>
  );
}
