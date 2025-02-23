"use client";
import Header from "@/components/Header";
import routeProtection from "@/components/HOC/routeProtection";
import { unsaveStore } from "@/components/store/SaveStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import axiosInstance from "@/lib/axiosInstance";
import { endpoints, imageBaseUrl } from "@/lib/constants";
import { formateDateTime } from "@/lib/utils";
import { SavedStore, SaveStorePayload, SaveStoreResponse } from "@/types/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookmark, BookmarkMinus, ChevronLeft, List, Loader2, MapPin, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function getSaveStores() {
  const { data } = await axiosInstance.get(endpoints.store.save);
  return data;
}

const Saved = () => {
  const router = useRouter();
  const { data, isPending } = useQuery<SavedStore[]>({
    queryKey: ["saveStores"],
    queryFn: getSaveStores,
  });

  return (
    <div className="main-container">
      <Header />
      <main>
        <section>
          <div className="flex gap-4 items-center mb-5">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <h1 className="text-2xl font-medium line-clamp-1">Saved List</h1>
              <p className="text-sm text-muted-foreground sm:block">Your best selective stores</p>
            </div>
          </div>

          {/* saved stores */}
          {data && data.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">No any saved store!</p>
          )}
          {isPending ? (
            <div className="text-center">Loading...</div>
          ) : (
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mb-8">
              {data?.map((store) => (
                <SavedStoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const SavedStoreCard = ({ store }: { store: SavedStore }) => {
  const queryClient = useQueryClient();
  // mutation for save store
  const { mutate, isPending } = useMutation<SaveStoreResponse, Error, SaveStorePayload>({
    mutationFn: unsaveStore,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["saveStores"], (oldData: SavedStore[]) =>
        oldData.filter((s) => s.storeId != variables.storeId)
      );
      toast({
        title: data.message,
      });
    },
    onError: (error: any) => {
      toast({
        description: error?.response.data.message || error.message,
        variant: "destructive",
      });
    },
  });
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <div className="w-full h-48 flex justify-center">
          <img src={`${imageBaseUrl}${store.store.logo}`} alt={store.store.name} className="object-cover" />
        </div>
        <div className="max-xs:p-4 p-6">
          <CardTitle>
            <h2 className="text-xl">{store.store.name}</h2>
          </CardTitle>
          <CardDescription>{store.store.tagline}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="max-xs:py-2 max-xs:px-4 flex flex-col gap-2 ">
        <p className="flex gap-2 items-center text-sm">
          <List className="w-4 h-4" /> {store.store.category.name}
        </p>
        <p className="flex gap-2 items-start text-sm">
          <span>
            <MapPin className="w-4 h-4" />
          </span>{" "}
          {store.store.storeAddresses.addressLine1}, {store.store.storeAddresses.addressLine2},{" "}
          {store.store.storeAddresses.city.name}
        </p>
        <p className="flex gap-2 items-center text-sm">
          <Bookmark className="w-4 h-4" /> {formateDateTime(store.createdAt)}
        </p>
      </CardContent>
      <CardFooter className="max-xs:p-4 flex justify-between">
        <Link href={`/${store.store.storeAddresses.city.name.toLowerCase()}/${store.store.slug}-${store.store.id}`}>
          <Button>
            <Store /> Go to Store
          </Button>
        </Link>
        <Button variant={"outline"} disabled={isPending} onClick={() => mutate({ storeId: store.storeId })}>
          {isPending ? <Loader2 className="animate-spin" /> : <BookmarkMinus />} unsaved
        </Button>
      </CardFooter>
    </Card>
  );
};

export default routeProtection(Saved);
