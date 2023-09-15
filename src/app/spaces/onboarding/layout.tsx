import { ReactNode } from "react";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="background-animate grid min-h-screen w-full animate-bg-animation grid-cols-1 place-items-center bg-gradient-to-br from-rose-800/20 via-blue-950/30 to-indigo-900/30 p-4 sm:p-5 lg:grid-cols-7">
      {children}
    </section>
  );
}
