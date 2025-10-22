export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export const MEDICATION_STATUS = {
  OVERDUE: 0,
  ON_TRACK: 1,
  RUNNING_LOW: 2,
};

export const MEDICATION_STATUS_LABEL = {
  [MEDICATION_STATUS.OVERDUE]: "Overdue",
  [MEDICATION_STATUS.ON_TRACK]: "On Track",
  [MEDICATION_STATUS.RUNNING_LOW]: "Running Low",
};
