import { Loader } from "lucide-react";
import { Suspense } from "react";
import { NewComputerForm } from "../_ui/NewComputerForm";
import { ShowAll } from "./all";

export default async function NewComputerPage() {
  return (
    <section>
      <h2>Create new</h2>

      <NewComputerForm />

      <hr />

      <Suspense fallback={<Loader className="animate-spin" />}>
        <ShowAll />
      </Suspense>
    </section>
  );
}
