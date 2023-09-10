import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function OnboardingPage() {
  return (
    <section className="col-start-3 col-span-3 flex flex-col gap-5 bg-zinc-900 p-10 rounded-2xl w-full border border-zinc-800 shadow-xl shadow-black/50">
      <header className="flex flex-col gap-2">
        <Badge className="max-w-max">Step 1 or Stepper</Badge>

        <h1 className="text-3xl font-bold">Welcome aboard</h1>
      </header>

      <div>
        <p>Let&apos;s register your company</p>
        <Button variant="link" className="px-0">
          I think it&pos;s already registered 🤔
        </Button>
      </div>
    </section>
  );
}
