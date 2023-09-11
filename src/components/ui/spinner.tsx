import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export const Spinner = ({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <Loader
      className={cn("animate-spin", className)}
      size={
        size === "sm"
          ? 16
          : size === "md"
          ? 20
          : size === "lg"
          ? 32
          : size === "xl"
          ? 48
          : 20
      }
    />
  );
};
