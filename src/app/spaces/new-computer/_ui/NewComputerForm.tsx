"use client";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewComputer, insertComputerSchema } from "@/lib/db/schema/computers";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const NewComputerForm = () => {
  const form = useForm<NewComputer>({
    resolver: zodResolver(insertComputerSchema),
    defaultValues: {
      brand: "",
      cores: 0,
    },
  });
  const { data: session } = useSession();
  const ctx = trpc.useContext();
  const newComputer = trpc.computers.new.useMutation({
    onSuccess: () => {
      ctx.computers.getComputers.invalidate();
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    toast.promise(newComputer.mutateAsync(data), {
      loading: "Creating computer...",
      success: "Saved!",
      error: "Something went wrong",
    });

    form.reset();
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormControl {...field}>
              <Input />
            </FormControl>
          )}
        />

        <h2>Hi</h2>

        <pre>{JSON.stringify(form.formState.errors)}</pre>
        <pre>{JSON.stringify(session)}</pre>
      </form>
    </Form>
  );
};
