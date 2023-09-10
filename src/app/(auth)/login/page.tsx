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
    <section className="p-7 md:p-10 rounded-xl bg-zinc-900/60 backdrop-filter backdrop-blur border border-zinc-800 md:col-start-2 col-span-2 w-full shadow-xl shadow-black/50 flex flex-col gap-5">
      <Badge className="max-w-max" variant="default">
        Welcome
      </Badge>

      <h1 className="text-3xl font-black">Let&apos;s get you in!</h1>

      <article className="grid grid-cols-1 md:grid-cols-9 md:gap-0 gap-2 w-full">
        <div className="flex flex-col gap-4 md:col-span-4">
          <p className="flex flex-col gap-1">
            <span className="text-zinc-200 font-medium">
              Is your company registered with us?
            </span>
            <span className="text-zinc-400 text-sm">
              If so enter its name or slug (handle) to find it!
            </span>
          </p>

          <Input placeholder="ACME LLC." />

          <Link href="/find-company">
            <span className="underline text-violet-500">
              I don&apos;t know 🤔
            </span>
          </Link>
        </div>

        <div className="md:hidden self-center flex items-center justify-between">
          <Separator className="bg-zinc-700 place-self-center w-1/3" />
          <span>or</span>
          <Separator className="bg-zinc-700 place-self-center w-1/3" />
        </div>

        <div className="hidden md:grid">
          <Separator
            className="bg-zinc-700 place-self-center"
            orientation="vertical"
          />
        </div>

        <div className="md:col-span-4">
          <ul className="flex flex-col gap-2 justify-center items-center h-full">
            {loginOptions.map((props) => (
              <SignIn key={props.provider} className="w-full" {...props} />
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
}
