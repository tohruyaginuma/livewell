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
import type { UserMedicationListItemResponse } from "@/server/service/user-medication-list-item-response";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  dosage: z.number().int().positive(),
  frequency: z.number().int().positive(),
  startDate: z.string().min(1, { message: "Start date is required" }),
  quantityReceived: z.number().int().positive(),
  daysSupply: z.number().int().positive(),
});

type FormData = z.infer<typeof formSchema>;

type props = {
  callback: () => void;
  item?: UserMedicationListItemResponse | null;
};

export const FormMedication = (props: props) => {
  const { callback, item } = props;
  const { id: userId } = useMeStore();

  // 1. Define your form.
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.medicationName || "",
      dosage: item?.dosage || 0,
      frequency: item?.frequency || 0,
      startDate: item?.startDate
        ? new Date(item.startDate).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      quantityReceived: item?.quantityReceived || 0,
      daysSupply: item?.daysSupply || 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (!userId) {
      toast.error("User not found");
      return;
    }

    try {
      // Convert date string to ISO string for API
      const submitData = {
        ...values,
        startDate: new Date(values.startDate).toISOString(),
      };

      const response = await fetch(
        item
          ? `${API_URL}/api/users/${userId}/user-medications/${item.id}`
          : `${API_URL}/api/users/${userId}/user-medications`,
        {
          method: item ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        },
      );
      if (!response.ok) {
        toast.error(
          item ? "Failed to update medication" : "Failed to create medication",
        );
        return;
      }
      const data = await response.json();
      console.log(data);
      callback();
      toast.success(
        item
          ? "Medication updated successfully"
          : "Medication created successfully",
      );
    } catch (error) {
      console.error(error);
      toast.error(
        item ? "Failed to update medication" : "Failed to create medication",
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-4">
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                    onChange={(e) => field.onChange(Number(e.target.value))}
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
                <Input type="date" placeholder="Start Date" {...field} />
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
