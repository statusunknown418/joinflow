import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { ParamsForWorkspacePages } from "./page";

const DynamicMainSidebar = dynamic(
  async () => {
    const { MainSidebar } = await import(
      "@/components/shared/WorkspacesLayout"
    );
    return { default: MainSidebar };
  },
  {
    loading: () => (
      <aside className="flex min-h-full w-[220px] flex-col items-center justify-center">
        <Spinner />
      </aside>
    ),
  },
);

const DynamicNavigation = dynamic(
  async () => {
    const { Navigation } = await import("@/components/shared/WorkspacesLayout");
    return { default: Navigation };
  },
  {
    loading: () => (
      <nav>
        <Spinner />
      </nav>
    ),
  },
);

export default function WorkspaceLayout({
  children,
  params: { workspace },
}: {
  children: ReactNode;
  params: ParamsForWorkspacePages;
}) {
  return (
    <section className="background-animate flex min-h-full overflow-hidden bg-gradient-to-tr from-teal-800/30 via-blue-900/30 to-amber-900/30">
      <DynamicMainSidebar slug={workspace} />

      <div className="relative flex max-h-screen flex-grow flex-col">
        <DynamicNavigation />

        <main className="mx-2 mb-2 h-full overflow-y-auto rounded-xl border border-input bg-zinc-800/20 p-5">
          {children}
        </main>
      </div>

      {/* <SecondarySidebar /> */}
    </section>
  );
}
