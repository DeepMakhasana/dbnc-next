"use client";
import React from "react";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";

const ShareStore = ({ title, bio }: { title: string; bio: string }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `${bio} \n`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing not supported on this browser.");
    }
  };

  return (
    <Button variant="outline" size={"icon"} onClick={handleShare}>
      <Share2 />
    </Button>
  );
};

export default ShareStore;
