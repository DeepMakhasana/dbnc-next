import { apiBaseUrl } from "@/lib/constants";

export async function generateStaticParams() {
  return [{ city: "ara" }, { city: "chandigarh" }];
}

async function getStoreByCity(params: Promise<{ city: string }>) {
  const res = await fetch(`${apiBaseUrl}/store/city/${(await params).city}`);
  const store = await res.json();

  return store;
}

export default async function StoreByCity({ params }: { params: Promise<{ city: string }> }) {
  const storeByCity = await getStoreByCity(params);
  console.log(storeByCity);

  return <div>city</div>;
}
