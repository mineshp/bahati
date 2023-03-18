import Tooltip  from "./tooltip";

interface Props {
  data: number | string;
  icon: JSX.Element;
  tooltip: string;
}

export default function Pill(props: Props): JSX.Element {
  const { data, icon, tooltip } = props;

  return (
    <div className="group relative">
    <div
      className={`h-8 rounded-lg border-2 border-indigo-200 bg-[url('/_static/crosspattern2.svg')] sm:h-10 z-10`}
    >
      <span className={`inline-block rounded-lg align-middle text-white`}>
        {icon}
      </span>
      <span
        className={`ml-2 inline-block text-right align-middle text-xs uppercase text-rose-400 sm:ml-4 sm:text-sm`}
      >
        {data}
      </span>
    </div>
   <Tooltip label={tooltip} />
    </div>
  );
}
