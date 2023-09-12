import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function SelectOrganizationPage() {
  const t1 = Date.now();
  const session = await getServerSession(authOptions)!;

  /** Assuming a session because middleware.ts will redirect to /login if not */
  const availableOrganizations = await db.query.organizations.findMany({
    where: (o, { eq }) => eq(o.ownerId, session?.user.id!),
  });
  const t2 = Date.now();

  return (
    <section>
      <h2>Select Organization</h2>

      <ul>
        {availableOrganizations.map((org) => (
          <li key={org.id}>
            <p>{org.name}</p>

            <p>{org.handle}</p>
          </li>
        ))}
      </ul>

      <small>Took {t2 - t1}ms</small>
    </section>
  );
}
