"use client";
import useLocationContext from "@/context/location/useLocationContext";
import { MapPinCheck, MapPinPlusIcon } from "lucide-react";
import React from "react";

const LocationStatus = () => {
  const { isSelected, isLoading } = useLocationContext();
  return (
    <div className="flex gap-2 items-center cursor-pointer">
      <div className="shadow p-1 rounded-lg border">
        {isLoading ? (
          "Loading.."
        ) : isSelected ? (
          <MapPinCheck className="w-6 h-6 text-primary" />
        ) : (
          <MapPinPlusIcon className="w-5 h-5 text-muted-foreground" />
        )}
      </div>
      <span className="text-sm text-muted-foreground pr-2">
        {isLoading ? "Loading.." : isSelected ? "Selected" : "Set Location"}
      </span>
    </div>
  );
};

export default LocationStatus;
