import { APIBASEURL } from "@/lib/constants";
import { ICitiesAPIResponse } from "./[city]/page";
import Link from "next/link";

export default async function Home() {
  const res = await fetch(`${APIBASEURL}/utils/available-cities`);
  const data: ICitiesAPIResponse[] = await res.json();
  return (
    <main className="flex justify-center">
      <div className="my-60">
        <p className="text-5xl font-bold mb-4">Coming soon!</p>
        <p>Available services in cities:</p>
        <div className="flex gap-3 ml-4 mb-3">
          {data?.map((city) => (
            <Link key={city.id} href={`/${city.name.toLowerCase()}`} className="underline">
              {city.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
