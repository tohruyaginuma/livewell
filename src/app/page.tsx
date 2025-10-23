"use client";

import { Table } from "@/frontend/components/table";
import { useMeStore } from "@/frontend/stores/use-me-store";
import { useCallback, useEffect, useState } from "react";
import { DrawerMedicationCreate } from "@/frontend/components/drawer-medication-create";
import { Button } from "@/frontend/components/ui/button";
import { useCreateMedicationDrawerStore } from "@/frontend/stores/use-create-medication-drawer-store";
import type { UserMedicationListItemResponse } from "@/server/service/user-medication-response";
import { API_URL } from "@/shared/constants";
import { SheetMedication } from "@/frontend/components/sheet-medication";
import { DeleteMedicationAlertDialog } from "@/frontend/components/delete-medication-alert-dialog";
import { DrawerMedicationEdit } from "@/frontend/components/drawer-medication-edit";
import { toast } from "sonner";
import { useDeleteMedicationAlertStore } from "@/frontend/stores/use-delete-medication-alert-store";
import { useEditMedicationDrawerStore } from "@/frontend/stores/use-edit-medication-drawer-store";

export default function Home() {
  const { setMe } = useMeStore();
  const { setIsOpen } = useCreateMedicationDrawerStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userMedications, setUserMedications] = useState<
    UserMedicationListItemResponse[]
  >([]);
  const { setIsOpen: setIsOpenDeleteMedicationAlert } =
    useDeleteMedicationAlertStore();
  const { setIsOpen: setIsOpenEditMedication } = useEditMedicationDrawerStore();

  const onClickDeleteMedication = async () => {
    toast.success("Medication deleted successfully");
    setIsOpenDeleteMedicationAlert(false);
  };

  const onClickEditMedication = async () => {
    toast.success("Medication updated successfully");
    setIsOpenEditMedication(false);
  };

  const fetchData = useCallback(async () => {
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
  }, [setMe]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex justify-end items-center">
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
      <DrawerMedicationCreate
        callback={async () => {
          await fetchData();
          setIsOpen(false);
        }}
      />
      <SheetMedication />
      <DeleteMedicationAlertDialog callback={onClickDeleteMedication} />
      <DrawerMedicationEdit callback={onClickEditMedication} />
    </>
  );
}
