import SignIn, { SignInProps } from "@/components/auth/SignIn";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Chrome, Github } from "lucide-react";
import Link from "next/link";

const loginOptions = [
  {
    label: "Sign in with Google",
    icon: <Chrome size={16} />,
    provider: "google",
  },
  {
    label: "Sign in with Github",
    icon: <Github size={16} className="fill-black" />,
    provider: "github",
  },
  {
    label: "Sign in with Discord",
    icon: <Github size={16} className="fill-black" />,
    provider: "discord",
  },
] satisfies SignInProps[];

export default function SignInModal() {
  return (
    <section className="col-span-2 flex w-full flex-col gap-5 rounded-xl border border-zinc-800 bg-zinc-900/60 p-7 shadow-xl shadow-black/50 backdrop-blur backdrop-filter md:col-start-2 md:p-10">
      <Badge className="max-w-max" variant="default">
        Welcome
      </Badge>

      <h1 className="text-3xl font-black">Let&apos;s get you in!</h1>

      <article className="grid w-full grid-cols-1 gap-2 md:grid-cols-9 md:gap-0">
        <div className="flex flex-col gap-4 md:col-span-4">
          <p className="flex flex-col gap-1">
            <span className="font-medium text-zinc-200">
              Is your company registered with us?
            </span>
            <span className="text-sm text-zinc-400">
              If so enter its name or slug (handle) to find it!
            </span>
          </p>

          <Input placeholder="ACME LLC." />

          <Link href="/find-company">
            <span className="text-violet-500 underline">
              I don&apos;t know 🤔
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-between self-center md:hidden">
          <Separator className="w-1/3 place-self-center bg-zinc-700" />
          <span>or</span>
          <Separator className="w-1/3 place-self-center bg-zinc-700" />
        </div>

        <div className="hidden md:grid">
          <Separator
            className="place-self-center bg-zinc-700"
            orientation="vertical"
          />
        </div>

        <div className="md:col-span-4">
          <ul className="flex h-full flex-col items-center justify-center gap-2">
            {loginOptions.map((props) => (
              <SignIn key={props.provider} className="w-full" {...props} />
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
