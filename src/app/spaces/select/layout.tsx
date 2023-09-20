import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <section className="background-animate min-h-screen animate-bg-animation bg-gradient-to-tr from-teal-500/30 via-blue-500/30 to-green-900/30">
      {children}
    </section>
  );
}
