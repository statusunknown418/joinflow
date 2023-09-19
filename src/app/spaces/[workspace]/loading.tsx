import { Spinner } from "@/components/ui/spinner";

export default function WorkspaceLoader() {
  return (
    <div className="flex h-full items-center justify-center">
      <Spinner />
    </div>
  );
}
