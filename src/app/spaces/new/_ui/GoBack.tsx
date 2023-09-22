"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const GoBack = () => {
  const { back } = useRouter();

  return (
    <Button
      variant="ghost"
      rounding="lg"
      className="px-2 text-zinc-400"
      onClick={back}
    >
      <ArrowLeft size={20} />
      Go back
    </Button>
  );
};
