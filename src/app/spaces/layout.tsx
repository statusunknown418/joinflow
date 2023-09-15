import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <section className="background-animate min-h-screen animate-bg-animation bg-gradient-to-tr from-teal-800/30 via-blue-950/30 to-rose-900/20">
      {children}
    </section>
  );
}
