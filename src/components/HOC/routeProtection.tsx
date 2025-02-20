"use client";
import useAuthContext from "@/context/auth/useAuthContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentType, FC, useLayoutEffect } from "react";

const routeProtection = <P extends object>(WrappedComponent: ComponentType<P>): FC<P> => {
  const ProtectedComponent = (props: P) => {
    const navigate = useRouter();
    const { isAuthenticated, isLoading } = useAuthContext(); // Replace with your auth logic

    useLayoutEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate.push("/auth");
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
      return (
        <div className="flex justify-center my-4">
          <Loader2 className="animate-spin w-6 h-6" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Add a display name for React Fast Refresh
  ProtectedComponent.displayName = `RouteProtected(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ProtectedComponent;
};

export default routeProtection;
