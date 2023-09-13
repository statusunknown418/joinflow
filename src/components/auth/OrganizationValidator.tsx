"use client";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { redirect, useSelectedLayoutSegments } from "next/navigation";

export const OrganizationValidator = () => {
  const segments = useSelectedLayoutSegments();
  const lastViewedOrgId = useLastViewedOrganization((s) => s.id);
  const lastViewedOrgHandle = useLastViewedOrganization((s) => s.handle);
  const isMounted = useMounted();

  const orgHandle = segments.at(0);

  if (!isMounted) return;

  if (orgHandle === lastViewedOrgHandle) return;

  if (orgHandle === undefined && lastViewedOrgId === undefined) {
    return redirect("/select-organization");
  }

  if (orgHandle) {
    return redirect(`/${orgHandle}/dashboard`);
  }

  return redirect(`/${lastViewedOrgHandle}/dashboard`);
};
