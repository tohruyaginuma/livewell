import { PropsWithChildren } from "react";

import {
  Sheet as SheetComponent,
  SheetContent,
  SheetTitle,
} from "@/frontend/components/ui/sheet";
import { Separator } from "@/frontend/components/ui/separator";

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
        className="overflow-y-auto px-4 pb-4 sm:max-w-none sm:w-3/7"
      >
        <SheetTitle className="sticky top-0 bg-white py-4">{header}</SheetTitle>

        {children}
      </SheetContent>
    </SheetComponent>
  );
};
