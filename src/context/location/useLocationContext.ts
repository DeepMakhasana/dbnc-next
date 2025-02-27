"use client";
import { useContext } from "react";
import LocationContext, { LocationContextType } from "./locationContext";

const useLocationContext = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};

export default useLocationContext;
