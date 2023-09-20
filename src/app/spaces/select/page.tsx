import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { RedirectModal } from "./_ui/RedirectModal";

export default async function SelectOrganizationPage() {
  const session = await getServerSession(authOptions)!;

  /** Assuming a session because middleware.ts will redirect to /login if not */
  const availableOrganizations = await db.query.organizations.findMany({
    where: (o, { eq }) => eq(o.ownerId, session?.user.id!),
  });

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <article className="flex w-[480px] flex-col gap-10 rounded-2xl border border-zinc-700 bg-zinc-800/30 p-10 shadow-xl shadow-black/50">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Select Organization</h1>
          <p className="text-muted-foreground">To get in the app</p>
        </header>

        <ul>
          {availableOrganizations.map((org) => (
            <Link href={`/spaces/${org.handle}`} key={org.id}>
              <li>
                <p>{org.name}</p>

                <p>{org.handle}</p>
              </li>
            </Link>
          ))}
        </ul>

        <div>
          <small className="text-muted-foreground">Glad you came back!</small>

          <p>Terms</p>
          <p>Privacy</p>
        </div>
      </article>

      <RedirectModal />
    </section>
  );
}
