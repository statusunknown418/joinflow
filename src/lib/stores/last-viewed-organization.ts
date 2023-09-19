import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrganizationType } from "../db/schema/organizations";

export type LastViewedOrganization = {
  id: number | null;
  handle: string | null;
  name: string | null;
  update: (
    o: Partial<Pick<OrganizationType, "handle" | "id" | "name">>,
  ) => void;
};

export const useLastViewedOrganization = create(
  persist<LastViewedOrganization>(
    (set) => ({
      id: null,
      handle: null,
      name: null,
      update: (o) => {
        set({
          id: o.id,
          handle: o.handle,
          name: o.name,
        });
      },
    }),
    {
      name: "last-viewed-organization",
    },
  ),
);
