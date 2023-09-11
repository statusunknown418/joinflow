import { Badge } from "@/components/ui/badge";
import { OnboardingForm } from "./_ui/OnboardingForm";

export default async function OnboardingPage() {
  return (
    <section className="col-start-3 col-span-3 flex flex-col gap-6 w-full">
      <header className="flex flex-col gap-2 justify-center">
        <Badge className="max-w-max">[Stepper here]</Badge>

        <h1 className="text-4xl font-extrabold">Welcome aboard</h1>

        <p className="text-muted-foreground">
          Let&apos;s register your company
        </p>
      </header>

      <OnboardingForm />
    </section>
  );
}
