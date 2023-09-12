import { create } from "zustand";
import { persist } from "zustand/middleware";
import { OrganizationType } from "../db/schema/organizations";

export type LastViewedOrganization = {
  id: number | null;
  handle: string | null;
  update: (o: Pick<OrganizationType, "handle" | "id">) => void;
};

export const useLastViewedOrganization = create(
  persist<LastViewedOrganization>(
    (set, get) => ({
      id: null,
      handle: null,
      update: (o) => {
        set({
          id: o.id,
          handle: o.handle,
        });
      },
    }),
    {
      name: "last-viewed-organization",
    },
  ),
);
