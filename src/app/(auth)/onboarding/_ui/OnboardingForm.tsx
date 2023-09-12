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
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRightFromCircle, CheckCircle, MinusCircle, SaveIcon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";

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
      handle: "",
    },
  });

  const sluggedHandle = slugify(methods.watch("name"));
  const selectedPlan = methods.watch("plan");
  const router = useRouter()

  const updateOnboardingStore = useOnboardingStore(
    (state) => state.completeOnboarding
  );

  const completeOnboarding = trpc.user.updateOnboarding.useMutation({
    onSuccess: () => {
      updateOnboardingStore();
      toast.success("Onboarding completed!");
      router.push(`/${sluggedHandle}/dashboard`);
    },
  });

  const newOrganization = trpc.organizations.new.useMutation({
    onSuccess: () => {
      completeOnboarding.mutate();
    },
  });

  const debouncedSlug = useDebounce(sluggedHandle, 500);
  const checkSlugAvailability =
    trpc.organizations.checkSlug.useQuery(debouncedSlug);

  const makeSubmit = methods.handleSubmit((data) => {
    newOrganization.mutate({
      ...data,
      handle: sluggedHandle,
    });
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
                  className="w-full p-2 rounded-lg"
                />
              </FormControl>

              <FormMessage />

              <FormDescription>
                A cool name for your company or the name itself
              </FormDescription>
            </FormItem>
          )}
        />

        <FormItem>
            <FormLabel>Identifier</FormLabel>

          <div className="flex items-center rounded-lg border border-zinc-700 h-9 overflow-hidden">
            <span className="px-4 border-r border-zinc-700 bg-zinc-800 h-full text-sm inline-flex items-center font-medium text-zinc-400">
              joinflow.sh/
            </span>

            <Input
              disabled
              className="rounded-l-none border-y-700 disabled:opacity-100 bg-transparent border-x-0 rounded-none disabled:text-zinc-300"
              defaultValue={sluggedHandle}
            />

            <span className="px-4 border-l border-zinc-700 h-full text-sm inline-flex items-center font-medium text-zinc-400 bg-zinc-800 ">
              {debouncedSlug.length > 0 ? (
                checkSlugAvailability.isLoading ? (
                  <Spinner size="sm" />
                ) : checkSlugAvailability.data?.available ? (
                  <CheckCircle className=" text-green-600" size={16} />
                ) : (
                  <XCircleIcon
                    className="text-red-500"
                    size={16}
                  />
                )
              ) : (
                <MinusCircle className="text-zinc-400" size={16} />
              )}
            </span>
          </div>



          {/* TODO: Update this error states and user interactions */}
          {
            !!debouncedSlug &&  checkSlugAvailability.data?.recommended && <FormDescription className="text-destructive">
              Oops, that name is unavailable
              
              {/* what about this one <ArrowRight size={16} className="inline-block" />{" "}
              <span className="text-white">
                {checkSlugAvailability.data?.recommended}
                </span> */}
            </FormDescription>
          }

          <FormDescription>
            This is based on your organization name and cannot be changed later, so choose wisely!
          </FormDescription>
        </FormItem>

        <FormField
          control={methods.control}
          name="plan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Plan</FormLabel>

              <FormDescription>
                Select the plan that best fits your needs
              </FormDescription>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center border rounded-xl p-2 border-muted"
                >
                  <FormItem className="flex group items-center space-y-0 w-full justify-center">
                    <FormControl>
                      <RadioGroupItem value="free" className="sr-only" />
                    </FormControl>

                    <FormLabel
                      className={cn(
                        "text-muted-foreground px-4 py-2 flex flex-col items-center gap-1 rounded-lg transition-all group-hover:bg-zinc-800/50 w-full",
                        selectedPlan === "free" &&
                          "ring-2 ring-zinc-500 text-zinc-400"
                      )}
                    >
                      <span className="font-bold">Free forever</span>
                      <span className="font-normal">$0/month</span>
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0 group w-full">
                    <FormControl className="sr-only">
                      <RadioGroupItem value="scaler" className="sr-only" />
                    </FormControl>

                    <FormLabel
                      className={cn(
                        "text-muted-foreground px-4 py-2 flex flex-col items-center gap-1 rounded-lg transition-all group-hover:bg-zinc-800/50 w-full",
                        selectedPlan === "scaler" &&
                          "ring-2 ring-violet-500 text-violet-400"
                      )}
                    >
                      <span className="font-bold">Scaler</span>
                      <span className="font-normal">$9/month</span>
                    </FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-y-0 group w-full">
                    <FormControl className="sr-only">
                      <RadioGroupItem value="enterprise" />
                    </FormControl>

                    <FormLabel
                      className={cn(
                        "text-muted-foreground px-4 py-2 flex flex-col items-center gap-1 rounded-lg transition-all group-hover:bg-zinc-800/50 w-full",
                        selectedPlan === "enterprise" &&
                          "ring-2 ring-blue-500 text-blue-400"
                      )}
                    >
                      <span className="font-bold">Enterprise</span>
                      <span className="font-normal">$29/month</span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>

              <FormDescription>
                <Link
                  href="/pricing"
                  className="text-violet-400 transition-all underline-offset-1 hover:underline"
                >
                  Find the details here! <ArrowUpRightFromCircle size={14}  className="inline-block"/>
                </Link>
              </FormDescription>

              <FormDescription className="text-xs">
                You can always change this later, it is not subject to any
                contract
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={newOrganization.isLoading || checkSlugAvailability.isLoading} className="self-end">
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
