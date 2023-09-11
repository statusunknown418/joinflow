"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

  const selectedPlan = methods.watch("plan");
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
            <FormItem>
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
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center"
                >
                  <FormItem className="flex group items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="free" className="group" />
                    </FormControl>

                    <FormLabel className="flex flex-col text-muted-foreground group-aria-checked:text-white">
                      <span>Free forever</span>
                      <span>$0/month</span>
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0">
                    <FormControl className="sr-only">
                      <RadioGroupItem value="scaler" />
                    </FormControl>

                    <FormLabel className="font-normal">
                      Scaler ($9/month)
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0">
                    <FormControl className="sr-only">
                      <RadioGroupItem value="enterprise" />
                    </FormControl>

                    <FormLabel className="font-normal">
                      Enterprise $29/month
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormDescription>
                Select the plan that best fits your needs
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={newOrganization.isLoading} className="self-end">
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
