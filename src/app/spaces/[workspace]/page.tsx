import { RedirectModal } from "../select/_ui/RedirectModal";

export type ParamsForWorkspacePages = {
  workspace: string;
};

export default async function HomePage() {
  return (
    <section>
      <h2 className="font-bold">Graphs, charts, hell yeah!</h2>

      <RedirectModal />
    </section>
  );
}
