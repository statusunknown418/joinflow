import { SignOut } from "@/components/auth/SignOut";
import { RedirectModal } from "./_ui/RedirectModal";

export default async function HomePage() {
  return (
    <section>
      <h2>You&apos;re authed</h2>

      <SignOut />

      <RedirectModal />
    </section>
  );
}
