"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/frontend/components/ui/breadcrumb";
import { Badge } from "@/frontend/components/ui/badge";
import { MEDICATION_STATUS_LABEL } from "@/shared/constants";
import { Calendar } from "@/frontend/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/frontend/components/ui/button";

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

      <div>
        <p className="text-2xl font-bold">Medication name</p>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="destructive"
        >
          {MEDICATION_STATUS_LABEL[0]}
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="default"
        >
          {MEDICATION_STATUS_LABEL[1]}
        </Badge>
        <Badge
          className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
          variant="secondary"
        >
          {MEDICATION_STATUS_LABEL[2]}
        </Badge>
      </div>

      <div className="flex gap-8">
        <div>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        </div>

        <dl>
          <dt>Dosage</dt>
          <dd>2 tablets daily</dd>

          <dt>Frequency</dt>
          <dd>2 tablets daily</dd>

          <dt>start date</dt>
          <dd>2 tablets daily</dd>

          <dt> quantity received</dt>
          <dd>2 tablets daily</dd>

          <dt>days’ supply.</dt>
          <dd>2 tablets daily</dd>

          <dt>current status</dt>
          <dd>2 tablets daily</dd>

          <dt>calculate refill dates</dt>
          <dd>2 tablets daily</dd>

          <dt>doses remaining</dt>
          <dd>2 tablets daily</dd>

          <dt>medication remaining</dt>
          <dd>2 tablets daily</dd>

          <dt>
            Trigger visual or text alerts when a refill is needed within 7 days
          </dt>
          <dd>2 tablets daily</dd>
        </dl>
      </div>
    </>
  );
}
