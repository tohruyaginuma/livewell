type Props = {
  label: string;
  value: string | number;
};

export const DtItem = (props: Props) => {
  const { label, value } = props;
  return (
    <div className="flex flex-col">
      <dt className="scroll-m-20 text-lg font-semibold tracking-tight">
        {label}
      </dt>

      <dd>{value}</dd>
    </div>
  );
};
