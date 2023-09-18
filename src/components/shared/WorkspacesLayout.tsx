"use client";

import { cn } from "@/lib/utils";
import { Newspaper } from "lucide-react";
import toast from "react-hot-toast";
import { SignOut } from "../auth/SignOut";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export const Navigation = ({
  selectedSegment,
}: {
  selectedSegment: string;
}) => {
  return (
    <nav className="mx-1 rounded-2xl border border-input bg-zinc-800/20 px-5 py-3 backdrop-blur-sm backdrop-filter">
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
        "flex min-h-screen flex-col justify-between rounded-r-2xl border border-zinc-700 bg-zinc-800/30 p-4 backdrop-blur backdrop-filter transition-all",
        "w-[220px]",
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

      <ul className="flex list-inside flex-col gap-6">
        <li>Recent activity</li>

        <Separator />

        <li>Job postings (1/5)</li>
        <li>Applicants (1/5)</li>
        <li>Interviews (1/5)</li>
        <li>Offers (1/5)</li>
        <li>Onboardings (1/5)</li>
        <li>Analytics (1/5)</li>
      </ul>

      <div className="flex items-center gap-2">
        <SignOut />

        <Newspaper size={20} />
      </div>
    </aside>
  );
};

export const SecondarySidebar = () => {
  return (
    <aside
      className={cn(
        "inset-0 flex flex-col rounded-l-2xl border border-zinc-700 bg-zinc-800/30 p-4 backdrop-blur backdrop-filter",
        "w-[220px]",
      )}
    >
      Sidebar 2 maybe
    </aside>
  );
};
