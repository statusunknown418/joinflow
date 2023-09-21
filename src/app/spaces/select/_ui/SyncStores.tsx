"use client";

import { OrganizationType } from "@/lib/db/schema/organizations";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import Link from "next/link";

export const SyncStores = ({ org }: { org: OrganizationType }) => {
  const update = useLastViewedOrganization((state) => state.update);

  return (
    <Link
      href={`/spaces/${org.handle}`}
      key={org.id}
      onClick={() =>
        update({
          handle: org.handle,
          id: org.id,
          name: org.name,
        })
      }
    >
      <li>
        <p>{org.name}</p>

        <p>{org.handle}</p>
      </li>
    </Link>
  );
};
