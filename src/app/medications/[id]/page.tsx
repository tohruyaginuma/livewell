"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MedicationPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Medications</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Medication Name</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="hidden sm:flex"
            onClick={() => {}}
            variant="destructive"
          >
            Delete Medication
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex"
            onClick={() => {}}
          >
            Edit Medication
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div>
          <h1>Medication Name</h1>

          <dl>
            <dt>Dosage</dt>
            <dd>2 tablets daily</dd>
            <dt>Dosage</dt>
            <dd>2 tablets daily</dd>
            <dt>Dosage</dt>
            <dd>2 tablets daily</dd>
            <dt>Dosage</dt>
            <dd>2 tablets daily</dd>
            <dt>Dosage</dt>
            <dd>2 tablets daily</dd>
          </dl>
        </div>
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>
      </div>
    </>
  );
}
