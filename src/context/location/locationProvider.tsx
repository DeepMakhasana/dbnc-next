"use client";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import LocationContext, { TCoordinates } from "./locationContext";
import { toast } from "@/hooks/use-toast";

type LocationProviderProps = {
  children: ReactNode;
};

export const LocationProvider: FC<LocationProviderProps> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<TCoordinates | null>(null);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const setCurrentLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude });
          setIsSelected(true);
          toast({
            title: "Current Location set successfully",
          });
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation Error:", error.message);
          setIsLoading(false);
          toast({
            title: "Location warning:",
            description: error.message,
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Set location manually because Geolocation is not supported by this browser.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, []);

  const set = () => {
    setCurrentLocation();
  };

  // const getToken = () => {
  //   return localStorage.getItem(constants.TOKEN);
  // };

  // const setToken = (value: string) => {
  //   return localStorage.setItem(constants.TOKEN, value);
  // };

  // const login = (token: string) => {
  //   if (token) {
  //     setIsLocationenticated(true);
  //     setToken(token);
  //     const decodedUser: IUser = jwtDecode(token);
  //     setUser(decodedUser);
  //   }
  // };

  // const logout = () => {
  //   setToken("");
  //   setIsLocationenticated(false);
  //   setUser(null);
  // };

  useEffect(() => {
    setCurrentLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ isSelected, isLoading, coordinates, set }}>{children}</LocationContext.Provider>
  );
};
