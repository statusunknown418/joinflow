"use client";

import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  CalendarDays,
  Cog,
  DollarSign,
  LayoutGrid,
  LogOut,
  MailCheck,
  Users,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { WorkspaceSelector } from "./WorkspaceSelector";

export const Navigation = () => {
  const selectedSegment = useSelectedLayoutSegment();

  const [parent] = useAutoAnimate();
  const { back, forward } = useRouter();

  const shouldShowBack = selectedSegment !== null && selectedSegment !== "";

  return (
    <nav className="mx-1 min-w-max rounded-b-2xl border border-input bg-zinc-800/20 px-5 py-3 backdrop-blur-sm backdrop-filter">
      <ul className="flex items-center gap-1" ref={parent}>
        <li>
          <Button
            variant="ghost"
            rounding="lg"
            size="sm"
            onClick={back}
            disabled={!shouldShowBack}
          >
            <ArrowLeft size={16} />
          </Button>
        </li>

        <li>
          <Button
            variant="ghost"
            rounding="lg"
            size="sm"
            onClick={forward}
            disabled={!shouldShowBack}
          >
            <ArrowRight size={16} />
          </Button>
        </li>

        <li className="ml-2 text-sm font-semibold">
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
  const mounted = useMounted();
  const { data: session } = useSession();

  return (
    <aside
      className={cn(
        "flex min-h-screen flex-col justify-between rounded-r-2xl border border-zinc-700 bg-zinc-800/30 px-2 py-4 backdrop-blur backdrop-filter transition-all",
        "w-[220px]",
      )}
    >
      <WorkspaceSelector />

      <ul className="flex list-inside flex-col gap-4">
        {/* TODO: REFACTOR */}
        {mainSidebarItems.map(({ Icon, href, label }, idx) => (
          <Link href={`/spaces/${slug}/${href}`} key={idx}>
            <li
              className={cn(
                "inline-flex w-full select-none items-center gap-3 rounded-full border border-transparent px-4 py-2",
                selectedSegment === href ||
                  (idx === 0 && selectedSegment === null)
                  ? "border-indigo-600 bg-indigo-900/40 text-zinc-50"
                  : "text-zinc-400 transition-all hover:bg-zinc-600/30 hover:text-zinc-50 hover:shadow-lg",
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

      <div className="flex min-h-[3rem] items-center gap-2">
        {mounted && session?.user?.image && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" rounding="lg" className="gap-3">
                <Image
                  src={session.user.image}
                  width={24}
                  height={24}
                  alt={session.user.name || "user logo"}
                  className="rounded-lg"
                />

                {session.user.name}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent side="right" align="end">
              <DropdownMenuItem>
                <Cog size={16} className="text-indigo-400" />
                <span>Settings</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={() =>
                  signOut({
                    callbackUrl: "/",
                  })
                }
              >
                <LogOut size={16} className="text-indigo-400" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
