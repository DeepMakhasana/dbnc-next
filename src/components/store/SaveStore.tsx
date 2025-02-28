"use client";
import React from "react";
import { Button } from "../ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SaveStorePayload, SaveStoreResponse } from "@/types/store";
import { toast } from "@/hooks/use-toast";
import useAuthContext from "@/context/auth/useAuthContext";
import { useRouter } from "next/navigation";

async function getSaveStoreStatus(storeId: number) {
  const { data } = await axiosInstance.get(`${endpoints.store.save}/${storeId}`);
  return data;
}

// save store
export async function saveStore(payload: SaveStorePayload): Promise<SaveStoreResponse> {
  const { data } = await axiosInstance.post(endpoints.store.save, payload);
  return data;
}

// unsave store
export async function unsaveStore(payload: SaveStorePayload): Promise<SaveStoreResponse> {
  const { data } = await axiosInstance.delete(`${endpoints.store.save}/${payload.storeId}`);
  return data;
}

const SaveStore = ({ storeId }: { storeId: number }) => {
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();
  const { data, isLoading } = useQuery<boolean>({
    queryKey: ["saveStoreStatus", { storeId }],
    queryFn: () => getSaveStoreStatus(storeId),
    enabled: !!isAuthenticated,
  });
  const queryClient = useQueryClient();

  // mutation for save store
  const { mutate, isPending: mutateIsPending } = useMutation<SaveStoreResponse, Error, SaveStorePayload>({
    mutationFn: saveStore,
    onSuccess: (data) => {
      queryClient.setQueryData(["saveStoreStatus", { storeId }], (oldData: boolean) => !oldData);
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

  // mutation for save store
  const { mutate: unsaveMutate, isPending: unSaveMutateIsPending } = useMutation<
    SaveStoreResponse,
    Error,
    SaveStorePayload
  >({
    mutationFn: unsaveStore,
    onSuccess: (data) => {
      queryClient.setQueryData(["saveStoreStatus", { storeId }], (oldData: boolean) => !oldData);
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

  const saveHandler = () => {
    if (!isAuthenticated) {
      router.push("/auth");
    } else {
      if (data) {
        unsaveMutate({ storeId });
      } else {
        mutate({ storeId });
      }
    }
  };

  if (isLoading || mutateIsPending || unSaveMutateIsPending) {
    return (
      <Button variant="outline" disabled>
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-10 ml-1" />
      </Button>
    );
  }

  return (
    <Button variant={data ? "default" : "outline"} onClick={saveHandler}>
      {data ? <BookmarkCheck /> : <Bookmark />} {data ? "saved" : "save"}
    </Button>
  );
};

export default SaveStore;
