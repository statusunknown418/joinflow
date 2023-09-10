import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="onboarding-layout-bg h-full w-full grid grid-cols-7 place-items-center">
      {children}
    </section>
  );
}
