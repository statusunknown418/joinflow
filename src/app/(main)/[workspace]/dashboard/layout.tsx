import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <section className="background-animate h-full animate-bg-animation bg-gradient-to-tr from-teal-800/20 via-blue-950/30 to-indigo-900/30">
      {children}
    </section>
  );
}
