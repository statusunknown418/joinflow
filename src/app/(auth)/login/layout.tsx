import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <section className="grid h-full grid-cols-1 place-items-center bg-gradient-to-tr from-green-950/50 via-blue-950/50 to-violet-900/20 px-5 md:grid-cols-4 md:px-0">
      {children}
    </section>
  );
}
