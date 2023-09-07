"use client";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewComputer, insertComputerSchema } from "@/lib/db/schema/computers";
import { trpc } from "@/lib/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createId } from "@paralleldrive/cuid2";
import { useForm } from "react-hook-form";

export const NewComputerForm = () => {
  const form = useForm<NewComputer>({
    resolver: zodResolver(insertComputerSchema),
    defaultValues: {
      brand: "",
      cores: 0,
      id: createId(),
    },
  });

  const ctx = trpc.useContext();
  const newComputer = trpc.computers.new.useMutation({
    onSuccess: () => {
      ctx.computers.getComputers.invalidate();
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    newComputer.mutate(data);

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
      </form>
    </Form>
  );
};
