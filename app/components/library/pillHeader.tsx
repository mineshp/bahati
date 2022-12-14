interface Props {
  data: number;
  currency: string;
  type: string;
}

export default function Pill(props: Props): JSX.Element {
  const { currency, data, type } = props;

  return (
    <div
      className={`w-38 rounded-lg border ${
        type === "high" ? "border-teal-400" : "border-rose-400"
      } h-8 px-0.5 pt-1 text-right sm:h-10 sm:px-2`}
    >
      <span
        className={`inline-block h-6 w-6 rounded-lg p-2 align-middle text-white ${
          type === "high" ? "bg-teal-400" : "bg-rose-400"
        } sm:h-7 sm:w-7`}
      >
        {type === "high" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="align-middle"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="align-middle"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
            />
          </svg>
        )}
      </span>
      <span
        className={`inline-block pl-0.5 align-middle text-xs ${
          type === "high" ? "text-teal-50" : "text-rose-50"
        } sm:pl-2 sm:text-sm`}
      >
        {data} {currency}
      </span>
    </div>
  );
}
