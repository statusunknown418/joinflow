import { OnboardingForm } from "./_ui/OnboardingForm";

export default async function OnboardingPage() {
  return (
    <section className="col-span-3 col-start-3 flex w-full flex-col gap-6">
      <header className="flex flex-col justify-center gap-2">
        <h1 className="text-4xl font-extrabold">Welcome aboard</h1>

        <p className="text-muted-foreground">
          Let&apos;s register your company
        </p>
      </header>

      <OnboardingForm />
    </section>
  );
}
