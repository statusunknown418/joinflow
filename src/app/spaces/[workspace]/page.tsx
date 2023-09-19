import { SignOut } from "@/components/auth/SignOut";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { RedirectModal } from "../select/_ui/RedirectModal";

export type ParamsForWorkspacePages = {
  workspace: string;
};

export default async function HomePage() {
  const t1 = Date.now();
  const session = await getServerSession(authOptions);

  const orgs = await db.query.organizations.findMany({
    where: (o, { eq }) => eq(o.ownerId, session?.user.id!),
    with: {
      owner: true,
    },
  });
  const t2 = Date.now();

  return (
    <section>
      <h2>You&apos;re authed</h2>

      {orgs.map((org) => (
        <div key={org.id}>
          <h2>Organization: {org?.name}</h2>
          <h3>-{org?.owner.email}</h3>
          <h3>{org?.handle}</h3>
          <h3>{org?.plan}</h3>
        </div>
      ))}

      <SignOut />

      <RedirectModal />

      <Button loading>Test</Button>
      <Button loading variant={"destructive"}>
        Test
      </Button>
      <Button loading variant={"ghost"}>
        Test
      </Button>
      <Button loading variant={"outline"}>
        Test
      </Button>
      <Button loading variant={"secondary"}>
        Test
      </Button>

      <small>{t2 - t1}ms</small>
    </section>
  );
}
