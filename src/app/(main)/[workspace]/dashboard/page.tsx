import { SignOut } from "@/components/auth/SignOut";
import { Spinner } from "@/components/ui/spinner";
import { db, findOrganizationByHandlePreparedSQL } from "@/lib/db";
import { Metadata } from "next";
import { RedirectModal } from "../_ui/RedirectModal";
import { ParamsForWorkspacePages } from "../page";

export async function generateMetadata({
  params,
}: {
  params: { workspace: string };
}): Promise<Metadata> {
  const workspace = await findOrganizationByHandlePreparedSQL.execute({
    handle: params.workspace,
  });

  return {
    title: workspace?.name ?? null,
  };
}

export default async function HomePage({
  params: { workspace },
}: {
  params: ParamsForWorkspacePages;
}) {
  const t1 = Date.now();
  const org = await db.query.organizations.findFirst({
    where: (o, { eq }) => eq(o.handle, workspace),
  });
  const t2 = Date.now();

  return (
    <section>
      <h2>You&apos;re authed in {JSON.stringify(org)}</h2>

      <SignOut />

      <RedirectModal />

      <Spinner />

      <small>{t2 - t1}ms</small>
    </section>
  );
}
