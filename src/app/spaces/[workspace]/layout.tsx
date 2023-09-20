import {
  Navigation,
  SecondarySidebar,
} from "@/components/shared/WorkspacesLayout";
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

export default function WorkspaceLayout({
  children,
  params: { workspace },
}: {
  children: ReactNode;
  params: ParamsForWorkspacePages;
}) {
  return (
    <section className="flex min-h-full animate-bg-animation overflow-hidden bg-gradient-to-tr from-teal-800/30 via-blue-900/30 to-rose-900/30">
      <DynamicMainSidebar slug={workspace} />

      <div className="relative col-span-4 flex max-h-screen flex-grow flex-col">
        <Navigation />

        <section className="overflow-y-auto p-5">{children}</section>
      </div>

      <SecondarySidebar />
    </section>
  );
}
