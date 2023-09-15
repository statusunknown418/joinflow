import { Spinner } from "@/components/ui/spinner";
import dynamic from "next/dynamic";

const DynamicOnboardingForm = dynamic(
  async () => {
    const { OnboardingForm } = await import("./_ui/OnboardingForm");
    return { default: OnboardingForm };
  },
  {
    loading: ({ error }) =>
      error ? <p>Error: {error.message}</p> : <Spinner size="md" />,
  },
);

export default function OnboardingPage() {
  return (
    <section className="col-span-2 flex w-full flex-col gap-6 lg:col-span-3 lg:col-start-3">
      <header className="flex flex-col justify-center gap-2">
        <h1 className="text-4xl font-extrabold">Welcome aboard</h1>

        <p className="text-muted-foreground">
          Let&apos;s register your company
        </p>
      </header>

      <DynamicOnboardingForm />
    </section>
  );
}
