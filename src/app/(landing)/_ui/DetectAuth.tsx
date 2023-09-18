"use client";

import { useMounted } from "@/lib/hooks/use-mounted";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const DetectAuth = () => {
  const { data: session } = useSession();

  const lastViewedOrganization = useLastViewedOrganization(
    (state) => state.handle,
  );
  const mounted = useMounted();

  return mounted ? (
    <div>
      {session?.user && (
        <Link href={`/spaces/${lastViewedOrganization}`}>Dashboard</Link>
      )}

      {!session?.user && <Link href="/login">Sign in</Link>}
    </div>
  ) : (
    <Link href="/login">Sign in</Link>
  );
};
