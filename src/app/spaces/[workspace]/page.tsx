import { RedirectModal } from "../select/_ui/RedirectModal";

export type ParamsForWorkspacePages = {
  workspace: string;
};

export default async function HomePage() {
  return (
    <section>
      <header>
        <h2 className="text-xl font-bold">Graphs, charts, hell yeah!</h2>
        <p className="text-muted-foreground">
          Take a look at the progress made at a glance
        </p>
      </header>

      <RedirectModal />
    </section>
  );
}
