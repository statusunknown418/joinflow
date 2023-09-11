"use client";
import { Computer } from "@/lib/db/schema/computers";
import { trpc } from "@/lib/trpc/client";

export const AllComputers = ({ initialData }: { initialData?: Computer[] }) => {
  const all = trpc.computers.getComputers.useQuery(undefined, {
    initialData: initialData || [],
  });

  if (all.isLoading) {
    return <div>Loading from CSR... skeleton</div>;
  }

  return (
    <div>
      <ul>
        {all.data.map((computer) => (
          <li key={computer.id}>
            {computer.brand} - {computer.cores} cores
          </li>
        ))}
      </ul>
    </div>
  );
};
