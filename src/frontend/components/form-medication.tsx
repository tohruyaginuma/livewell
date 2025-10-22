"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/frontend/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/frontend/components/ui/form";
import { Input } from "@/frontend/components/ui/input";
import { toast } from "sonner";
import { API_URL } from "@/shared/constants";
import { useMeStore } from "../stores/use-me-store";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  dosage: z.number().int().positive(),
  frequency: z.number().int().positive(),
  startDate: z.string().date(),
  quantityReceived: z.number().int().positive(),
  daysSupply: z.number().int().positive(),
});

type props = {
  callback: () => void;
};

export const FormMedication = (props: props) => {
  const { callback } = props;
  const { id: userId } = useMeStore();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dosage: 0,
      frequency: 0,
      startDate: "",
      quantityReceived: 0,
      daysSupply: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!userId) {
      toast.error("User not found");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/users/${userId}/medications`,
        {
          method: "POST",
          body: JSON.stringify(values),
        },
      );
      if (!response.ok) {
        toast.error("Failed to create medication");
        return;
      }
      const data = await response.json();
      console.log(data);
      callback();
      toast.success("Medication created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create medication");
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Medication Name</FormLabel>
              <FormControl>
                <Input placeholder="Medication Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dosage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dosage</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Dosage"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Frequency"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {" "}
          <FormField
            control={form.control}
            name="quantityReceived"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity Received</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Quantity Received"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="daysSupply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Days Supply</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Days Supply"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Start Date"
                  {...field}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
