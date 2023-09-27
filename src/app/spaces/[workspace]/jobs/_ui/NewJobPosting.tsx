"use client";

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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import {
  AddJobPosting,
  addJobPostingSchema,
} from "@/lib/db/schema/job-posting";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ALLOWED_CURRENCIES = ["USD", "EUR", "GBP", "PEN"] as const;

export const NewJobPosting = ({ children }: { children: ReactNode }) => {
  const methods = useForm<AddJobPosting>({
    resolver: zodResolver(addJobPostingSchema),
    defaultValues: {
      budget: 0,
      currency: "USD",
      description: "",
      title: "",
      compensationType: "monthly",
      state: "draft",
      showCompensation: true,
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    toast(JSON.stringify(data));
  });

  console.log(methods.formState.errors);

  return (
    <Sheet open>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className="flex h-full flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="text-2xl">New job posting</SheetTitle>
          <SheetDescription>
            Get ready to setup your job posting and get it live in minutes.
          </SheetDescription>
        </SheetHeader>

        <Form {...methods}>
          <form onSubmit={onSubmit} className="min-h-full pb-10">
            <article className="flex flex-col gap-5">
              <h3 className="text-lg font-semibold text-foreground">
                Basic details
              </h3>

              <FormField
                control={methods.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>

                    <FormControl {...field}>
                      <Input />
                    </FormControl>

                    <FormMessage />

                    <FormDescription>
                      This is the title of your job posting. It will be
                      displayed on the job board and in the job posting page.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>

                    <FormControl {...field}>
                      <Textarea />
                    </FormControl>

                    <FormMessage />

                    <FormDescription>
                      Provide a simple description of what you&apos;re looking
                      for.
                    </FormDescription>
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-1">
                <FormField
                  control={methods.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem className="w-20 self-end">
                      <Select defaultValue="USD">
                        <SelectTrigger>
                          <FormControl {...field}>
                            <SelectValue placeholder="Choose" />
                          </FormControl>
                        </SelectTrigger>

                        <SelectContent>
                          {ALLOWED_CURRENCIES.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={methods.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormLabel>Compensation</FormLabel>

                      <FormControl {...field}>
                        <Input type="number" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </article>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
