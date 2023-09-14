"use client";

import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const DetectAuth = () => {
  const { data: session } = useSession();
  const lastViewedOrganization = useLastViewedOrganization(
    (state) => state.handle,
  );

  return (
    <div>
      {session?.user ? (
        <Link href={`/spaces/${lastViewedOrganization}`}>Dashboard</Link>
      ) : (
        <Link href="/login">Sign in</Link>
      )}
    </div>
  );
};
