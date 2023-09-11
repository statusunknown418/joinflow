"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  CreateOrganizationType,
  createOrganizationSchema,
} from "@/lib/db/schema/organizations";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const OnboardingForm = () => {
  const methods = useForm<CreateOrganizationType>({
    resetOptions: {
      keepIsValid: true,
    },
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      plan: "free",
      avatarURL: "",
    },
  });

  const updateOnboardingStore = useOnboardingStore(
    (state) => state.completeOnboarding
  );

  const completeOnboarding = trpc.user.updateOnboarding.useMutation({
    onSuccess: () => {
      updateOnboardingStore();
      toast.success("Onboarding completed!");
    },
  });

  const newOrganization = trpc.organizations.new.useMutation({
    onSuccess: () => {
      completeOnboarding.mutate();
    },
  });

  const makeSubmit = methods.handleSubmit((data) => {
    newOrganization.mutate(data);
  });

  return (
    <Form {...methods}>
      <form
        onSubmit={makeSubmit}
        className="flex flex-col gap-5 bg-zinc-900/70 p-5 rounded-2xl w-full border border-zinc-800 shadow-xl shadow-black/50"
      >
        <FormField
          control={methods.control}
          name="name"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <FormLabel>Name</FormLabel>
              <FormControl {...field}>
                <Input
                  placeholder="ACME LLC."
                  className="w-full p-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:outline-none focus:border-violet-600"
                />
              </FormControl>

              <FormMessage />

              <FormDescription>
                A cool name for your company or the name itself
              </FormDescription>
            </div>
          )}
        />

        <Button disabled={newOrganization.isLoading}>
          {newOrganization.isLoading ? (
            <Spinner className="animate-spin" />
          ) : (
            <SaveIcon size={16} />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};
