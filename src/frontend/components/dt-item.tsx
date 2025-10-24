type Props = {
  label: string;
  value: string | number;
};

export const DtItem = (props: Props) => {
  const { label, value } = props;
  return (
    <div className="flex justify-between py-2 border-b">
      <dt className="text-muted-foreground">{label}</dt>

      <dd className="font-medium"> {value}</dd>
    </div>
  );
};
