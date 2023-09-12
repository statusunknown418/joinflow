import { redirect } from "next/navigation";

export type ParamsForWorkspacePages = {
  workspace: string;
};

export default function RedirectToDashboardPage({
  params: { workspace },
}: {
  params: ParamsForWorkspacePages;
}) {
  return redirect(`/${workspace}/dashboard`);
}
