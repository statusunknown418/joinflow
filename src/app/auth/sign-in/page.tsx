import SignIn from "@/components/auth/SignIn";
import { Input } from "@/components/ui/input";

export default function SignInPage() {
  return (
    <section>
      <h1>Hey, want to get in?</h1>

      <p>Is your company registered with us?</p>
      <span className="underline">I don&apos;t know 🤔</span>

      <Input placeholder="ACME LLC." />

      <ul>
        <li>With google</li>
        <li>With discord</li>
        <li>With github</li>
      </ul>

      <SignIn />
    </section>
  );
}
