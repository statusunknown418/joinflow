import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid place-items-center grid-cols-1 md:grid-cols-4 h-full bg-gradient-to-tr from-green-950/50 via-blue-950/50 to-violet-900/20 px-5 md:px-0">
      {children}
    </section>
  );
}
