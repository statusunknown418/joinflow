"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function WorkspaceSelector() {
  const organizationName = useLastViewedOrganization((state) => state.name);
  const update = useLastViewedOrganization((state) => state.update);

  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const workspaces = trpc.organizations.getAll.useQuery(undefined);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          rounding="lg"
          aria-expanded={open}
          className="w-full justify-between text-xs font-semibold"
        >
          {organizationName
            ? workspaces.data?.find((o) => o.name === organizationName)?.name
            : "Select organization..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start" sideOffset={10}>
        <Command>
          <CommandInput placeholder="Search organizations" />

          <CommandEmpty>No organization found</CommandEmpty>

          <CommandGroup>
            {workspaces.data?.map((workspace) => (
              <CommandItem
                key={workspace.handle}
                onSelect={() => {
                  update({
                    name: workspace.name,
                    id: workspace.id,
                    handle: workspace.handle,
                  });
                  setOpen(false);

                  push(`/spaces/${workspace.handle}`);
                }}
              >
                <Check
                  className={cn(
                    "h-4 w-4 text-indigo-400",
                    organizationName === workspace.name
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />

                {workspace.avatarURL ? (
                  <Image
                    src={workspace.avatarURL}
                    width={32}
                    height={32}
                    alt={workspace.name}
                    className="rounded-full"
                  />
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-300 uppercase text-indigo-700">
                    {workspace.handle[0] + workspace.handle.split("-")[1][0]}
                  </span>
                )}

                <span className="capitalize">{workspace.name}</span>
              </CommandItem>
            ))}

            <CommandSeparator className="mt-2" />

            <CommandItem
              className="mt-2 h-10"
              onSelect={() => {
                setOpen(false);
                push("/spaces/new");
              }}
            >
              <PlusCircle size={20} className="text-indigo-400" />
              <span>Create a workspace</span>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
