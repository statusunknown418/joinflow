"use client";

import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { Button } from "../ui/button";

export const Navigation = ({
  selectedSegment,
}: {
  selectedSegment: string;
}) => {
  return (
    <nav className="mx-1 rounded-2xl border border-input bg-zinc-800/20 px-5 py-5 backdrop-blur-sm backdrop-filter">
      <ul className="flex items-center gap-4">
        <li className="text-sm font-bold">{selectedSegment}</li>
      </ul>
    </nav>
  );
};

export const MainSidebar = () => {
  return (
    <aside
      className={cn(
        "flex min-h-screen flex-col rounded-r-2xl border border-zinc-700 bg-zinc-800/30 p-4 backdrop-blur backdrop-filter transition-all",
      )}
    >
      <Button
        variant="outline"
        onClick={() => {
          toast.success("test");
        }}
      >
        Collapse
      </Button>
      Sidebar 1
    </aside>
  );
};

export const SecondarySidebar = () => {
  return (
    <aside className="inset-0 flex flex-col rounded-l-2xl border border-zinc-700 bg-zinc-800/30 p-4 backdrop-blur backdrop-filter">
      Sidebar 2 maybe
    </aside>
  );
};
