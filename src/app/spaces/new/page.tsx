import { OnboardingForm } from "../onboarding/_ui/OnboardingForm";

export default function NewOrganizationPage() {
  return (
    <article className="col-span-2 flex flex-col gap-5 md:col-start-2">
      <h1 className="text-3xl font-bold text-zinc-100">New Organization</h1>
      <OnboardingForm isOnboard />
    </article>
  );
}
