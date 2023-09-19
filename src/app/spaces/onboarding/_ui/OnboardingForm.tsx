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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
  CreateOrganizationType,
  createOrganizationSchema,
} from "@/lib/db/schema/organizations";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRightFromCircle,
  CheckCircle,
  MinusCircle,
  Send,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const router = useRouter();

  const updateLastViewed = useLastViewedOrganization((state) => state.update);
  const updateOnboardingStore = useOnboardingStore(
    (state) => state.completeOnboarding,
  );

  const completeOnboarding = trpc.user.updateOnboarding.useMutation({
    onSuccess: () => {
      updateOnboardingStore();
      router.push(`/spaces/${sluggedHandle}`);
      toast.success("Onboarding completed!");
    },
  });

  const newOrganization = trpc.organizations.new.useMutation({
    onSuccess: ({ organization: { insertId } }) => {
      updateLastViewed({
        handle: sluggedHandle,
        id: Number(insertId),
        name: methods.getValues("name"),
      });
      completeOnboarding.mutate();
    },
    onError: () => {
      toast.error("The URL is already taken, try a new one");
    },
  });

  const debouncedSlug = useDebounce(sluggedHandle, 500);
  const checkSlugAvailability =
    trpc.organizations.checkSlug.useQuery(debouncedSlug);

  const makeSubmit = methods.handleSubmit((data) => {
    newOrganization.mutate({
      ...data,
      approxSizeUpTo: Number(data.approxSizeUpTo),
      handle: sluggedHandle,
    });
  });

  useEffect(() => {
    methods.setValue("handle", sluggedHandle);
  }, [methods, sluggedHandle]);

  return (
    <Form {...methods}>
      <form
        onSubmit={makeSubmit}
        className="flex w-full flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 shadow-xl shadow-black/50"
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
                  className="w-full rounded-lg p-2"
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
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace URL</FormLabel>

              <div className="flex h-9 items-center overflow-hidden rounded-lg border border-zinc-700">
                <span className="hidden h-full items-center border-r border-zinc-700 bg-muted px-4 text-sm font-medium text-zinc-400 sm:inline-flex">
                  joinflow.sh/
                </span>

                <FormControl {...field}>
                  <Input
                    className="border-y-700 rounded-none rounded-l-none border-x-0 bg-transparent disabled:text-zinc-300 disabled:opacity-100"
                    disabled
                  />
                </FormControl>

                <span className="inline-flex h-full items-center border-l border-zinc-700 bg-muted px-4 text-sm font-medium text-zinc-400 ">
                  {debouncedSlug.length > 0 ? (
                    checkSlugAvailability.isLoading ? (
                      <Spinner size="sm" />
                    ) : checkSlugAvailability.data?.available ? (
                      <CheckCircle className=" text-green-600" size={16} />
                    ) : (
                      <XCircleIcon className="text-red-500" size={16} />
                    )
                  ) : (
                    <MinusCircle className="text-zinc-400" size={16} />
                  )}
                </span>
              </div>

              {/* TODO: Update this error states and user interactions */}
              {!!debouncedSlug && checkSlugAvailability.data?.recommended && (
                <FormDescription className="text-destructive">
                  Oops, that name is unavailable
                  {/* what about this one <ArrowRight size={16} className="inline-block" />{" "}
              <span className="text-white">
                {checkSlugAvailability.data?.recommended}
                </span> */}
                </FormDescription>
              )}

              <FormDescription>
                This cannot be changed later{" "}
                <span className="italic">(for now)</span>, so choose wisely!
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={methods.control}
          name="approxSizeUpTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agency size</FormLabel>

              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={"Up to 10"} />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value={"10"}>1-10</SelectItem>
                  <SelectItem value={"50"}>11-50</SelectItem>
                  <SelectItem value={"100"}>51-100</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />

              <FormDescription>
                This will help us better understand your needs
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

              <FormDescription>
                Select the plan that best fits your needs
              </FormDescription>

              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 items-center rounded-xl border border-input p-2 transition-all focus-within:ring-2 focus-within:ring-ring md:grid-cols-3"
                >
                  <FormItem className="group flex w-full items-center justify-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="free" className="sr-only" />
                    </FormControl>

                    <FormLabel
                      className={cn(
                        "flex w-full flex-col items-center gap-1 rounded-lg px-4 py-2 text-muted-foreground transition-all group-hover:bg-zinc-800/50",
                        selectedPlan === "free" &&
                          "text-zinc-400 ring-2 ring-zinc-500",
                      )}
                    >
                      <span className="font-bold">Free forever</span>
                      <span className="font-normal">$0/month</span>
                    </FormLabel>
                  </FormItem>

                  <FormItem className="group flex w-full items-center space-y-0">
                    <FormControl className="sr-only">
                      <RadioGroupItem value="scaler" className="sr-only" />
                    </FormControl>

                    <FormLabel
                      className={cn(
                        "flex w-full flex-col items-center gap-1 rounded-lg px-4 py-2 text-muted-foreground transition-all group-hover:bg-zinc-800/50",
                        selectedPlan === "scaler" &&
                          "text-violet-400 ring-2 ring-violet-500",
                      )}
                    >
                      <span className="font-bold">Scaler</span>
                      <span className="font-normal">$9/month</span>
                    </FormLabel>
                  </FormItem>

                  <FormItem className="group flex w-full items-center space-y-0">
                    <FormControl className="sr-only">
                      <RadioGroupItem value="enterprise" />
                    </FormControl>

                    <FormLabel
                      className={cn(
                        "flex w-full flex-col items-center gap-1 rounded-lg px-4 py-2 text-muted-foreground transition-all group-hover:bg-zinc-800/50",
                        selectedPlan === "enterprise" &&
                          "text-blue-400 ring-2 ring-blue-500",
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
                  className="text-violet-400 underline-offset-1 transition-all hover:underline"
                >
                  Find the details here!{" "}
                  <ArrowUpRightFromCircle size={14} className="inline-block" />
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

        <Button
          disabled={
            newOrganization.isLoading ||
            checkSlugAvailability.isLoading ||
            checkSlugAvailability.data?.available === false
          }
          className="self-end"
        >
          {newOrganization.isLoading ? (
            <Spinner className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
};
