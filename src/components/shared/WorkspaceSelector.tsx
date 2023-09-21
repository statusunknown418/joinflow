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
import { OrganizationType } from "@/lib/db/schema/organizations";
import { useMounted } from "@/lib/hooks/use-mounted";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { Check, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "../ui/spinner";

export function WorkspaceSelector() {
  const organizationName = useLastViewedOrganization((state) => state.name);
  const update = useLastViewedOrganization((state) => state.update);
  const mounted = useMounted();

  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const workspaces = trpc.organizations.getAll.useQuery(undefined);

  const handleSelectWorkspace = (workspace: OrganizationType) => {
    update({
      name: workspace.name,
      id: workspace.id,
      handle: workspace.handle,
    });

    setOpen(false);

    push(`/spaces/${workspace.handle}`);
  };

  const currentImageSrc = workspaces.data?.find(
    (o) => o.name === organizationName,
  )?.avatarURL;

  if (!mounted) {
    return (
      <Button
        variant="outline"
        role="combobox"
        rounding="lg"
        className={cn("w-full justify-center gap-3 border-transparent")}
      >
        <Spinner />
      </Button>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          rounding="lg"
          aria-expanded={open}
          className={cn(
            "justify-start gap-3 border-transparent px-3 capitalize",
            open && "bg-zinc-600/30",
          )}
        >
          {organizationName && currentImageSrc && (
            <Image
              src={currentImageSrc}
              width={24}
              height={24}
              alt={organizationName}
            />
          )}

          {organizationName
            ? workspaces.data?.find((o) => o.name === organizationName)?.name
            : "Select organization..."}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="start" sideOffset={10}>
        <Command>
          <CommandInput placeholder="Search organizations" />

          <CommandEmpty>No organization found</CommandEmpty>

          <CommandGroup>
            {workspaces.data?.map((workspace) => (
              <CommandItem
                className="even:mt-1"
                key={workspace.handle}
                onSelect={() => handleSelectWorkspace(workspace)}
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
                    width={24}
                    height={24}
                    alt={workspace.name}
                    className="rounded-lg"
                  />
                ) : (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-300 text-xs uppercase text-indigo-700">
                    {workspace.handle[0] + workspace.handle.split("-")[1][0]}
                  </span>
                )}

                <span className="capitalize">{workspace.name}</span>
              </CommandItem>
            ))}

            <CommandSeparator className="mt-2" />

            <CommandItem
              className="mt-2 h-8 gap-3"
              onSelect={() => {
                setOpen(false);
                push("/spaces/new");
              }}
            >
              <PlusCircle size={16} className="text-indigo-400" />
              <span>New organization</span>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
