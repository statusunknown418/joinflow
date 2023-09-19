"use client";

import { cn } from "@/lib/utils";
import {
  Briefcase,
  CalendarDays,
  DollarSign,
  LayoutGrid,
  MailCheck,
  Newspaper,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import toast from "react-hot-toast";
import { SignOut } from "../auth/SignOut";
import { Button } from "../ui/button";

export const Navigation = ({ slug }: { slug: string }) => {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <nav className="mx-1 rounded-2xl border border-input bg-zinc-800/20 px-5 py-3 backdrop-blur-sm backdrop-filter">
      <ul className="flex items-center gap-4">
        <li className="text-sm font-bold">{selectedSegment || "Dashboard"}</li>
      </ul>
    </nav>
  );
};

export const mainSidebarItems = [
  {
    label: "Dashboard",
    Icon: LayoutGrid,
    href: "",
  },
  {
    label: "Job postings",
    Icon: Briefcase,
    href: "jobs",
  },
  {
    label: "Applicants",
    Icon: Users,
    href: "applicants",
  },
  {
    label: "Interviews",
    Icon: CalendarDays,
    href: "interviews",
  },
  {
    label: "Offers",
    Icon: DollarSign,
    href: "offers",
  },
  {
    label: "Email templates",
    Icon: MailCheck,
    href: "emails",
  },
];

export const MainSidebar = ({ slug }: { slug: string }) => {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <aside
      className={cn(
        "flex min-h-screen flex-col justify-between rounded-r-2xl border border-zinc-700 bg-zinc-800/30 px-2 py-5 backdrop-blur backdrop-filter transition-all",
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

      <ul className="flex list-inside flex-col gap-4">
        {mainSidebarItems.map(({ Icon, href, label }, idx) => (
          <Link href={`/spaces/${slug}/${href}`} key={idx}>
            <li
              className={cn(
                "inline-flex w-full items-center gap-2 rounded-full px-4 py-2",
                selectedSegment === href ||
                  (idx === 0 && selectedSegment === null)
                  ? "bg-indigo-900/70 text-zinc-50"
                  : "text-zinc-300 transition-all hover:bg-background/80 hover:text-zinc-50 hover:shadow-lg",
              )}
            >
              <Icon
                size={16}
                className={cn(
                  selectedSegment === href ||
                    (idx === 0 && selectedSegment === null)
                    ? "text-indigo-400"
                    : "text-inherit",
                )}
              />

              <span>{label}</span>
            </li>
          </Link>
        ))}
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
