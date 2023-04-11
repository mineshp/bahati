interface Options {
  id: number;
  name: string;
  value: string;
  interval: string;
}

interface Props {
  options: Options[];
  handleSelect: (range: string, interval: string) => any;
  type: string;
  name: string;
}

// TODO: Move to utility function
function getInterval(range: string): string {
  switch (range) {
    case "5d":
      return "1d";
    case "1m":
      return "1w";
    case "3m":
      return "1w";
    case "1y":
      return "1m";
    default:
      return "1d";
  }
}

export default function Dropdown(prop: Props) {
  return (
    <div className="flex justify-center rounded">
      <div className="m-2">
        <select
          data-te-select-init
          onChange={(e) =>
            prop.handleSelect(e.target.value, getInterval(e.target.value))
          }
          className="block rounded-md border border-rose-300 bg-rose-300 p-2 text-white hover:bg-rose-600 focus:border-rose-600 focus:ring-rose-600"
          name={prop.name}
        >
          {prop.options.map(({ id, name, value }) => (
            <option key={id} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
