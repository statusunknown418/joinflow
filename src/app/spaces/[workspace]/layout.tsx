import {
  MainSidebar,
  Navigation,
  SecondarySidebar,
} from "@/components/shared/WorkspacesLayout";
import { ReactNode } from "react";
import { ParamsForWorkspacePages } from "./page";

export default function WorkspaceLayout({
  children,
  params: { workspace },
}: {
  children: ReactNode;
  params: ParamsForWorkspacePages;
}) {
  return (
    <section className="flex min-h-full overflow-hidden">
      <MainSidebar slug={workspace} />

      <div className="relative col-span-4 flex max-h-screen flex-grow flex-col">
        <Navigation slug={workspace} />

        <section className="overflow-y-auto p-5">{children}</section>
      </div>

      <SecondarySidebar />
    </section>
  );
}
