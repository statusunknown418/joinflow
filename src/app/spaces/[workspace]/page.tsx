import { RedirectModal } from "../select/_ui/RedirectModal";
import { KpiCardGrid } from "./_dashboard/KpiCardGrid";

export type ParamsForWorkspacePages = {
  workspace: string;
};

export default async function HomePage() {
  return (
    <section>
      <header>
        <h1 className="text-xl font-bold">Graphs, charts, hell yeah!</h1>
        <p className="text-muted-foreground">
          Take a look at the progress made at a glance
        </p>
      </header>

      <h3>Recent open jobs</h3>

      <KpiCardGrid />

      <RedirectModal />
    </section>
  );
}
