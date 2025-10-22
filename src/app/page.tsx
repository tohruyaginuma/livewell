"use client";

import { Table } from "@/frontend/components/table";
import { useMeStore } from "@/frontend/stores/use-me-store";
import { useEffect, useState } from "react";
import { DrawerMedicationCreate } from "@/frontend/components/drawer-medication-create";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/frontend/components/ui/breadcrumb";
import { Button } from "@/frontend/components/ui/button";
import { useCreateMedicationDrawerStore } from "@/frontend/stores/use-create-medication-drawer-store";
import { UserMedicationResponse } from "@/server/service/user-medication-response";
import { API_URL } from "@/shared/constants";

export default function Home() {
  const { setMe } = useMeStore();
  const { setIsOpen } = useCreateMedicationDrawerStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userMedications, setUserMedications] = useState<
    UserMedicationResponse[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const userId = 1;
        const user = await fetch(`${API_URL}/api/users/${userId}/`);
        const userData = await user.json();
        setMe(userData.id, userData.name);

        const userMedications = await fetch(
          `${API_URL}/api/users/${userId}/medications`,
        );
        const userMedicationsData = await userMedications.json();
        setUserMedications(userMedicationsData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      <Table items={userMedications} isLoading={isLoading} />
      <DrawerMedicationCreate />
    </>
  );
}
