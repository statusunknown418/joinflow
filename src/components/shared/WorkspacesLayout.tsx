"use client";

import { useMounted } from "@/lib/hooks/use-mounted";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  CalendarDays,
  DollarSign,
  LayoutGrid,
  MailCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { SignOut } from "../auth/SignOut";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";

export const Navigation = () => {
  const selectedSegment = useSelectedLayoutSegment();

  return (
    <nav className="mx-1 rounded-2xl border border-input bg-zinc-800/20 px-5 py-3 backdrop-blur-sm backdrop-filter">
      <ul className="flex items-center gap-4">
        <li className="text-sm font-semibold">
          {selectedSegment || "Dashboard"}
        </li>
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
  const organizationName = useLastViewedOrganization((state) => state.name);
  const mounted = useMounted();

  return (
    <aside
      className={cn(
        "flex min-h-screen flex-col justify-between rounded-r-2xl border border-zinc-700 bg-zinc-800/30 px-2 py-5 backdrop-blur backdrop-filter transition-all",
        "w-[220px]",
      )}
    >
      <header className="flex items-center justify-between">
        {mounted ? (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={organizationName} />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="org-1">Update to Combobox</SelectItem>
              <SelectItem value="new">New</SelectItem>
            </SelectContent>
          </Select>
        ) : (
          <div className="flex h-9 w-full items-center justify-center rounded-lg border border-input">
            <Spinner />
          </div>
        )}
      </header>

      <ul className="flex list-inside flex-col gap-4">
        {mainSidebarItems.map(({ Icon, href, label }, idx) => (
          <Link href={`/spaces/${slug}/${href}`} key={idx}>
            <li
              className={cn(
                "inline-flex w-full select-none items-center gap-2 rounded-full px-4 py-2",
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
