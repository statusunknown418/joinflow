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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { UploadDropzone } from "@/lib/api/uploadthing/client";
import {
  CreateOrganizationType,
  createOrganizationSchema,
} from "@/lib/db/schema/organizations";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useLastViewedOrganization } from "@/lib/stores/last-viewed-organization";
import { useOnboardingStore } from "@/lib/stores/onboarding-store";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  CheckCircle,
  MinusCircle,
  Send,
  XCircleIcon,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import slugify from "slugify";

export const OnboardingForm = ({
  isOnboard = false,
}: {
  isOnboard?: boolean;
}) => {
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

  const avatarURL = methods.watch("avatarURL");
  const sluggedHandle = slugify(methods.watch("name"));
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
        <div className="flex h-[120px] items-center gap-2">
          <UploadDropzone
            endpoint="imageUploader"
            className="flex min-h-full max-w-full cursor-pointer items-center justify-center border border-dashed border-input transition-all focus:outline-none focus:ring-2 focus:ring-ring"
            content={{
              label: (
                <span className="font-semibold">
                  Choose a logo image or drag it here
                </span>
              ),
              allowedContent: (
                <span className="text-xs text-muted-foreground">
                  Only IMAGES allowed, max 4MB
                </span>
              ),
            }}
            appearance={{
              label: {
                fontSize: 13,
                textOverflow: "clip",
              },
              allowedContent: {
                fontSize: 12,
              },
              button: {
                fontSize: 12,
                color: "#9CA3AF",
              },
              uploadIcon: {
                width: 24,
                height: 24,
              },
            }}
            config={{
              mode: "auto",
            }}
            onUploadProgress={(_p) => {
              // TODO: Add progress ui
            }}
            onClientUploadComplete={(res) => {
              toast.success("Upload Completed");
              methods.setValue("avatarURL", res?.[0].url || null);
            }}
            onUploadError={(error: Error) => {
              toast.error(`Upload error! ${error.message}`);
            }}
          />

          {avatarURL && <ArrowRight className="text-zinc-500" />}

          {avatarURL && (
            <div className="flex min-h-full items-center rounded-xl border border-input p-1">
              <Image
                src={avatarURL}
                alt={"logo"}
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
          )}
        </div>

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
                </FormDescription>
              )}

              <FormDescription>
                This cannot be changed later{" "}
                <span className="italic">(for now)</span>, so choose wisely!
              </FormDescription>
            </FormItem>
          )}
        />

        {!isOnboard && (
          <>
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
          </>
        )}

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
