import { GoBack } from "./_ui/GoBack";

export default function NewOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="background-animate flex min-h-full flex-col gap-10 bg-gradient-to-br from-emerald-900/30 to-transparent p-10">
      <GoBack />
      <section className="grid grid-cols-1 justify-center sm:grid-cols-2 md:grid-cols-4">
        {children}
      </section>
    </div>
  );
}
