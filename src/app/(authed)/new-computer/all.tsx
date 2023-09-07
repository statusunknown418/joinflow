import { getComputers } from "@/lib/api/computers/queries";
import { AllComputers } from "../_ui/AllComputers";

export const ShowAll = async () => {
  const all = await getComputers();

  return <AllComputers initialData={all} />;
};
