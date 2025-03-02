"use client";
import { DoorClosed, DoorOpen, Radio } from "lucide-react";
import { MotionTopBottomDiv } from "../motion/TopBottomDiv";
import MoreOption from "./MoreOption";
import { useEffect, useState } from "react";
import { APIBASEURL, endpoints } from "@/lib/constants";
import { Skeleton } from "../ui/skeleton";

const Header = ({ id }: { id: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${APIBASEURL}${endpoints.store.main}/status/${id}`)
      .then((res) => res.json())
      .then((data: { id: number; isOpen: boolean } | null) => {
        if (data) {
          setIsOpen(data.isOpen);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <MotionTopBottomDiv className="flex justify-between items-center py-6">
      {isLoading ? (
        <Skeleton className="h-9 w-32" />
      ) : (
        <div className="flex gap-2 border-b-2 rounded py-2 px-4">
          {isOpen ? (
            <>
              <DoorOpen /> <strong>OPEN</strong>
            </>
          ) : (
            <>
              <DoorClosed /> <strong>CLOSE</strong>
            </>
          )}
          <div className="text-red-800 flex gap-1">
            <Radio className="w-4 h-4 " /> <span className="text-xs font-medium">Live</span>
          </div>
        </div>
      )}

      <MoreOption />
    </MotionTopBottomDiv>
  );
};

export default Header;
