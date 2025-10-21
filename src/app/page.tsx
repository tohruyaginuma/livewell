"use client";

import { Table } from "@/frontend/components/table";
import { useMeStore } from "@/frontend/stores/use-me-store";
import { useEffect } from "react";
import { DrawerMedicationCreate } from "@/frontend/components/drawer-medication-create";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/frontend/components/ui/breadcrumb";
import { Button } from "@/frontend/components/ui/button";
import { useCreateMedicationDrawerStore } from "@/frontend/stores/use-create-medication-drawer-store";

export default function Home() {
  const { setMe } = useMeStore();
  const { setIsOpen } = useCreateMedicationDrawerStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/1", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        setMe(userData.id, userData.name);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [setMe]);

  return (
    <>
      <div className="flex justify-between items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>Medications</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:flex"
          onClick={() => setIsOpen(true)}
        >
          Add Medication
        </Button>
      </div>
      <Table />
      <DrawerMedicationCreate />
    </>
  );
}
