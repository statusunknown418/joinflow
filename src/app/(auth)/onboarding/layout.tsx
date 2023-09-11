import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="w-full grid grid-cols-7 place-items-center bg-gradient-to-br from-rose-800/20 via-blue-950/30 to-indigo-900/30 h-full animate-bg-animation background-animate">
      {children}
    </section>
  );
}
