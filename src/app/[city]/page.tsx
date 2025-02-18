import { APIBASEURL } from "@/lib/constants";

interface ICitiesAPIResponse {
  name: string;
  id: number;
}

interface ICities {
  city: string;
}

export async function generateStaticParams() {
  const res = await fetch(`${APIBASEURL}/utils/available-cities`);
  const data: ICitiesAPIResponse[] = await res.json();
  const cities: ICities[] = data.map((city) => ({ city: city.name.toLowerCase() }));
  console.log("cities", cities);
  return cities;
}

async function getStoreByCity(params: Promise<{ city: string }>) {
  const res = await fetch(`${APIBASEURL}/store/city/${(await params).city}`);
  const store = await res.json();

  return store;
}

export default async function StoreByCity({ params }: { params: Promise<{ city: string }> }) {
  const storeByCity = await getStoreByCity(params);
  console.log(storeByCity);

  return <div>city</div>;
}
