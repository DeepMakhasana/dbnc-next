"use client";

import useLocationContext from "@/context/location/useLocationContext";
import axiosInstance from "@/lib/axiosInstance";
import { endpoints, imageBaseUrl } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { List, MapPin, MapPinOff, Route, Store } from "lucide-react";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import Link from "next/link";

interface INearByStore {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  logo: string;
  city: string;
  state: string;
  addressLine1: string;
  addressLine2: string;
  category: string;
  distance: number;
}

const NearByStores = () => {
  const [range, setRange] = useState<number>(30);
  const { coordinates } = useLocationContext();
  const { data, isLoading } = useQuery<INearByStore[]>({
    queryKey: ["nearByStores", coordinates, range],
    queryFn: async function () {
      const { data } = await axiosInstance.get(
        `${endpoints.store.main}/nearBy?lat=${coordinates?.latitude}&lon=${coordinates?.longitude}&range=${range}`
      );
      return data;
    },
    enabled: !!coordinates && !!range,
  });

  console.log(data, isLoading);
  return (
    <div>
      <div className="flex justify-between items-center pb-6 pt-2">
        <div>
          <h1 className="text-2xl font-medium line-clamp-1">Near by stores</h1>
          <p className="text-sm text-muted-foreground sm:block">Available near by stores</p>
        </div>
        <Select onValueChange={(value) => setRange(Number(value))} value={String(range)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Distance</SelectLabel>
              <SelectItem value="10">10 KM</SelectItem>
              <SelectItem value="20">20 KM</SelectItem>
              <SelectItem value="30">30 KM</SelectItem>
              <SelectItem value="50">50 KM</SelectItem>
              <SelectItem value="100">100 KM</SelectItem>
              <SelectItem value="200">200 KM</SelectItem>
              <SelectItem value="300">300 KM</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {data && data.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">No any store near by you, explore by city.</p>
      )}

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : !data ? (
        <p className="flex justify-center items-center gap-2 text-sm text-muted-foreground">
          <MapPinOff className="w-5 h-5" /> Start Location for near by store.
        </p>
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mb-8">
          {data?.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}
    </div>
  );
};

const StoreCard = ({ store }: { store: INearByStore }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="w-full h-48 flex justify-center p-2">
          <img src={`${imageBaseUrl}${store.logo}`} alt={store.name} className="object-contain rounded bg-muted px-3" />
        </div>
        <div className="max-xs:p-4 px-6 pb-4">
          <CardTitle>
            <h2 className="text-xl">{store.name}</h2>
          </CardTitle>
          <CardDescription>{store.tagline}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="max-xs:py-2 max-xs:px-4 flex flex-col gap-2 ">
        <p className="flex gap-2 items-center text-sm">
          <List className="w-4 h-4" /> {store.category}
        </p>
        <p className="flex gap-2 items-start text-sm">
          <span>
            <MapPin className="w-4 h-4" />
          </span>{" "}
          {store.addressLine1}, {store.addressLine2}, {store.city}
        </p>
        <p className="flex gap-2 items-center text-sm">
          <Route className="w-4 h-4" /> {store.distance.toFixed(2)} km
        </p>
      </CardContent>
      <CardFooter className="max-xs:p-4 flex justify-between">
        <Link href={`/${store.city.toLowerCase()}/${store.slug}-${store.id}`}>
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

export default NearByStores;
