import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="background-animate grid h-full w-full animate-bg-animation grid-cols-7 place-items-center bg-gradient-to-br from-rose-800/20 via-blue-950/30 to-indigo-900/30">
      {children}
    </section>
  );
}
