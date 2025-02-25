import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { APIBASEURL, imageBaseUrl } from "@/lib/constants";
import { List, MapPin, Store } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export interface ICitiesAPIResponse {
  name: string;
  id: number;
}

interface ICities {
  city: string;
}

interface Store {
  id: number;
  logo: string;
  name: string;
  number: string;
  slug: string;
  storeAddresses: {
    addressLine1: string;
    addressLine2: string;
    city: { name: string };
    state: { name: string };
  };
  category: { name: string };
  tagline: string;
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const city = (await params).city;

  return {
    title: `Live stores in ${city} | Liveyst`,
    description: `Quickly check stores status in ${city} with Liveyst! Get real-time updates on opening status, contact info, and services for seamless visits.`,
    keywords: [
      `live opening status in ${city}`,
      `live stores status in ${city}`,
      "live near by store opening status",
      "liveyst",
    ],
    openGraph: {
      title: `Live stores in ${city} | Liveyst`,
      description: `Quickly check stores status in ${city} with Liveyst! Get real-time updates on opening status, contact info, and services for seamless visits.`,
    },
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${APIBASEURL}/utils/available-cities`);
  const data: ICitiesAPIResponse[] = await res.json();
  const cities: ICities[] = data.map((city) => ({ city: city.name.toLowerCase() }));
  console.log("cities", cities);
  return cities;
}

async function getStoreByCity(params: Promise<{ city: string }>): Promise<Store[]> {
  const res = await fetch(`${APIBASEURL}/store/city/${(await params).city}`);
  const store = await res.json();

  return store;
}

export default async function StoreByCity({ params }: { params: Promise<{ city: string }> }) {
  const data = await getStoreByCity(params);
  const city = await params;

  return (
    <div className="main-container">
      <Header />
      <main>
        <section>
          <div className="pb-6">
            <h1 className="text-2xl font-medium line-clamp-1">
              Live Store in {city.city[0].toUpperCase() + city.city.slice(1)}
            </h1>
            <p className="text-sm text-muted-foreground sm:block">Available stores</p>
          </div>
          {/* stores */}
          {data && data.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">No any saved store!</p>
          ) : (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mb-8">
              {data?.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const StoreCard = ({ store }: { store: Store }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="w-full h-48 flex justify-center p-2">
          <img src={`${imageBaseUrl}${store.logo}`} alt={store.name} className="object-contain rounded" />
        </div>
        <div className="max-xs:p-4 px-6 py-3">
          <CardTitle>
            <h2 className="text-xl">{store.name}</h2>
          </CardTitle>
          <CardDescription>{store.tagline}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="max-xs:py-2 max-xs:px-4 flex flex-col gap-2 ">
        <p className="flex gap-2 items-center text-sm">
          <List className="w-4 h-4" /> {store.category.name}
        </p>
        <p className="flex gap-2 items-start text-sm">
          <span>
            <MapPin className="w-4 h-4" />
          </span>{" "}
          {store.storeAddresses.addressLine1}, {store.storeAddresses.addressLine2}, {store.storeAddresses.city.name}
        </p>
        {/* <p className="flex gap-2 items-center text-sm">
          <Bookmark className="w-4 h-4" /> {formateDateTime(store.createdAt)}
        </p> */}
      </CardContent>
      <CardFooter className="max-xs:p-4 flex justify-between">
        <Link href={`/${store.storeAddresses.city.name.toLowerCase()}/${store.slug}-${store.id}`}>
          <Button>
            <Store /> Go to Store
          </Button>
        </Link>
        {/* <Button variant={"outline"} disabled={isPending} onClick={() => mutate({ storeId: store.storeId })}>
          {isPending ? <Loader2 className="animate-spin" /> : <BookmarkMinus />} unsaved
        </Button> */}
      </CardFooter>
    </Card>
  );
};
