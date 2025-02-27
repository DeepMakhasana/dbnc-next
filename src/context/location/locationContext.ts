"use client";
// import { IUser } from "@/types/auth";
import { createContext, Dispatch, SetStateAction } from "react";

export type TCoordinates = {
  latitude: number;
  longitude: number;
};

export interface LocationContextType {
  isSelected: boolean;
  isLoading: boolean;
  coordinates: TCoordinates | null;
  // setUser: Dispatch<SetStateAction<IUser | null>>;
  // setIsLocationenticated: Dispatch<SetStateAction<boolean>>;
  // login: (token: string) => void;
  set: () => void;
}

const defaultUser: LocationContextType = {
  isSelected: false,
  isLoading: false,
  coordinates: null,
  // setIsLocationenticated: () => {},
  // setUser: () => {},
  // login: () => {},
  set: () => {},
};

// Location context
const LocationContext = createContext<LocationContextType>(defaultUser);

export default LocationContext;
