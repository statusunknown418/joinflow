import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ChevronRight, ZapOffIcon } from "lucide-react";
import dynamic from "next/dynamic";

const DynamicNewJobPostingSheet = dynamic(
  async () => {
    const { NewJobPosting } = await import(
      "@/app/spaces/[workspace]/jobs/_ui/NewJobPosting"
    );
    return { default: NewJobPosting };
  },
  {
    ssr: false,
    loading: () => <Spinner />,
  },
);

export default function JobPostingsPage() {
  return (
    <section className="flex min-h-full flex-col items-center justify-center gap-10">
      <ZapOffIcon size={48} className="text-indigo-400" />

      <div className="flex flex-col items-center gap-1">
        <h3 className="text-xl font-semibold">
          You&apos;ve got no active job postings.
        </h3>

        <p className="text-muted-foreground">
          But don&apos;t worry you can create up to <strong>5</strong> with your
          current plan
        </p>
      </div>

      <DynamicNewJobPostingSheet>
        <Button size="sm">
          <span>Let&apos;s create one</span>

          <ChevronRight size={16} />
        </Button>
      </DynamicNewJobPostingSheet>
    </section>
  );
}
