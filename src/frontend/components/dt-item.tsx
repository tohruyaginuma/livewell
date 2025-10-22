import { Separator } from "@/frontend/components/ui/separator";

type Props = {
  label: string;
  value: string;
};

export const DtItem = (props: Props) => {
  const { label, value } = props;
  return (
    <div className="flex flex-col gap-1">
      <dt className="scroll-m-20 text-xl font-semibold tracking-tight">
        {label}
      </dt>

      <dd>{value}</dd>
    </div>
  );
};
