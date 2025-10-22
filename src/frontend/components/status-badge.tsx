import { useMemo } from "react";
import { Badge } from "./ui/badge";
import { MEDICATION_STATUS, MEDICATION_STATUS_LABEL } from "@/shared/constants";

type Props = {
  status: keyof typeof MEDICATION_STATUS_LABEL;
};

export const StatusBadge = (props: Props) => {
  const { status } = props;

  const variant = useMemo(() => {
    switch (status) {
      case MEDICATION_STATUS.OVERDUE:
        return "destructive";
      case MEDICATION_STATUS.ON_TRACK:
        return "default";
      default:
        return "secondary";
    }
  }, [status]);

  return (
    <Badge
      className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant={variant}
    >
      {MEDICATION_STATUS_LABEL[status]}
    </Badge>
  );
};
