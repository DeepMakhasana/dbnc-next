"use client";
import useLocationContext from "@/context/location/useLocationContext";
import { Check, ChevronsUpDown, Loader2, Locate, MapPinCheck, MapPinPlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import axiosInstance from "@/lib/axiosInstance";
import { endpoints } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { ICitiesAPIResponse } from "@/app/[city]/page";
import { useParams, usePathname, useRouter } from "next/navigation";

async function getAvailableCities() {
  const { data } = await axiosInstance.get(endpoints.utils.availableCities);
  return data;
}

const LocationStatus = () => {
  const { isSelected, isLoading, set } = useLocationContext();
  const router = useRouter();
  const params = useParams();
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const { data, isLoading: isCitiesLoading } = useQuery<ICitiesAPIResponse[]>({
    queryKey: ["availableCities"],
    queryFn: getAvailableCities,
  });

  const cities = data?.map((city) => ({ value: city.name.toLowerCase(), label: city.name }));

  useEffect(() => {
    if (params.city) {
      setValue(params.city as string);
    }
  }, [params.city]);

  return (
    <Drawer onOpenChange={setIsOpen} open={isOpen}>
      <DrawerTrigger asChild>
        <div className="flex gap-2 items-center cursor-pointer border rounded-lg">
          <div className="shadow p-1 rounded-lg border">
            {isLoading ? (
              <Skeleton className="h-6 w-6 rounded" />
            ) : isSelected ? (
              <MapPinCheck className="w-6 h-6 text-primary" />
            ) : params?.city ? (
              <MapPinCheck className="w-6 h-6 text-primary" />
            ) : (
              <MapPinPlusIcon className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <span className="text-sm text-muted-foreground pr-2">
            {isLoading ? (
              <Skeleton className="h-6 w-10" />
            ) : isSelected ? (
              params?.city ? (
                capitalizeFirstLetter(params.city as string)
              ) : (
                "Current"
              )
            ) : params?.city ? (
              capitalizeFirstLetter(params.city as string)
            ) : (
              "Set Location"
            )}
          </span>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm flex flex-col gap-3 my-6">
          <DrawerHeader>
            <DrawerTitle>Set Location</DrawerTitle>
            <DrawerDescription>Select current location for best experience</DrawerDescription>
          </DrawerHeader>
          {/* current location */}
          <Button
            className="mx-4"
            onClick={() => {
              set();
              setIsOpen(false);
              if (path !== "/") {
                router.replace("/");
              }
            }}
          >
            <Locate /> Choose current location
          </Button>
          {/* or */}
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border m-4">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
          {/* select by city */}
          <div className="mx-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {value ? cities?.find((city) => city.value === value)?.label : "Select City"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search city..." />
                  {isCitiesLoading ? (
                    <CommandList>
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" /> Loading...
                      </div>
                    </CommandList>
                  ) : (
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {cities?.map((city) => (
                          <CommandItem
                            key={city.value}
                            value={city.value}
                            onSelect={(currentValue) => {
                              setValue(currentValue === value ? "" : currentValue);
                              setOpen(false);
                              router.push(`/${currentValue}`);
                            }}
                          >
                            {city.label}
                            <Check className={cn("ml-auto", value === city.value ? "opacity-100" : "opacity-0")} />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default LocationStatus;
