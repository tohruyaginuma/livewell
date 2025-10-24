import { PropsWithChildren } from "react";

import {
  Sheet as SheetComponent,
  SheetContent,
  SheetTitle,
} from "@/frontend/components/ui/sheet";

type Props = PropsWithChildren<{
  isOpen: boolean;
  header: React.ReactNode;
  onClose: () => void;
}>;

export const Sheet = (props: Props) => {
  const { children, isOpen, onClose, header } = props;

  return (
    <SheetComponent open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="overflow-y-auto px-6 py-6 sm:max-w-none sm:w-4/7"
      >
        <SheetTitle className="">{header}</SheetTitle>

        {children}
      </SheetContent>
    </SheetComponent>
  );
};
