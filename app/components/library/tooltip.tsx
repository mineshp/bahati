
interface Props {
  label: string;
}

export default function Tooltip(props: Props) {
  return (
    <span
    className="pointer-events-none absolute -bottom-9 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 bg-indigo-400 text-white p-2 rounded-md text-xs z-50"
  >
    {props.label}
  </span>
  )
}