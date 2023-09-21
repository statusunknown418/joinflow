"use client";
import { useMounted } from "@/lib/hooks/use-mounted";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { SignOut } from "../auth/SignOut";
import { Spinner } from "../ui/spinner";
import { WorkspaceSelector } from "./WorkspaceSelector";
import { mainSidebarItems } from "./WorkspacesLayout";

export const MainSidebar = ({ slug }: { slug: string }) => {
  const selectedSegment = useSelectedLayoutSegment();
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
          <WorkspaceSelector />
        ) : (
          <div className="flex h-9 w-full items-center justify-center rounded-lg">
            <Spinner />
          </div>
        )}
      </header>

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

      <div className="flex items-center gap-2">
        <SignOut />
      </div>
    </aside>
  );
};
