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
      ) : isOpen ? (
        <div className="flex gap-2 border-b-2 rounded py-2 px-4 text-green-800 border-green-800">
          <DoorOpen /> <strong>OPEN</strong>{" "}
          <div className="text-red-800 flex gap-1">
            <Radio className="w-4 h-4 " /> <span className="text-xs font-medium">Live</span>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 border-b-2 rounded py-2 px-4 text-red-800 border-red-800">
          <DoorClosed /> <strong>CLOSE</strong>{" "}
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
