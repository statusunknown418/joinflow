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
    <div className="flex min-h-full flex-col">
      <section className="grid min-h-full grid-cols-6 overflow-hidden">
        <MainSidebar />

        <div className="relative col-span-4 flex max-h-screen flex-col">
          <Navigation selectedSegment={workspace} />

          <section className="overflow-y-auto p-5">{children}</section>
        </div>

        <SecondarySidebar />
      </section>
    </div>
  );
}
