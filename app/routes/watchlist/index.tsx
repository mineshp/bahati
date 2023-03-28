import { useState } from "react";
import Dropdown from "../../components/library/dropdown";

const watchlistGroups = [
  {
    id: 1,
    name: "General",
    value: "general",
  },
  {
    id: 2,
    name: "Tech",
    value: "tech",
  },
];

function SearchBar() {
  return (
    <div className="flex">
      <label
        htmlFor="search-dropdown"
        className="sr-only text-sm font-medium text-gray-900 dark:text-white"
      >
        Select watchlist
      </label>
      <div className="">
        <select
          data-te-select-init
          onChange={(e) => {}}
          className="block rounded-l-lg border border-rose-300 bg-rose-300 p-2.5 text-white hover:bg-rose-600 focus:border-rose-600 focus:ring-rose-600"
        >
          {watchlistGroups.map(({ id, name, value }) => (
            <option key={id} value={value}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full">
        <input
          type="search"
          id="search"
          className="z-20 block w-full rounded-r-lg border border-l-2 border-gray-300 border-l-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-rose-300 dark:bg-rose-200 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500"
          placeholder="Enter share code..."
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 rounded-r-lg border border-rose-700 bg-rose-700 p-2.5 text-sm font-medium text-white hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300 dark:bg-rose-400 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

// interface SearchResultsProps {
//   results: {
//     shareCode: string;
//   }[];
// }

// function SearchResults(prop: SearchResultsProps) {
//   const rowData = prop.results.map((result: { shareCode: string }) => {
//     return (
//       <tr key={`${result.shareCode}`}>
//         <td className="px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-700">
//           {result.shareCode}
//         </td>
//         <td className="px-6 py-4 text-sm whitespace-no-wrap border-b border-gray-200 text-cyan-700">
//           <button
//             type="button"
//             className="items-center text-rose-300 hover:text-rose-500"
//             onClick={() => {}}
//           >
//             Add to Watchlist
//           </button>
//         </td>
//       </tr>
//     );
//   });

//   return rowData.length ? (
//     <div className="flex flex-col pt-4">
//       <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
//         <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
//           <table className="min-w-full">
//             <tbody className="bg-white">{rowData}</tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   ) : (
//     <div className="p-4 text-gray-400">No results found</div>
//   );
// }

interface WatchlistProps {
  results: {
    shareCode: string;
    open: number;
    dailyChange: number;
  }[];
}

function Watchlist(prop: WatchlistProps) {
  const watchlistRowData = prop.results.map(
    (shareOverview: {
      shareCode: string;
      open: number;
      dailyChange: number;
    }) => {
      return (
        <tr key={`${shareOverview.shareCode}`}>
          <td className="whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-cyan-700 sm:px-6">
            {shareOverview.shareCode}
          </td>
          <td className="whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-cyan-700 sm:px-6">
            {shareOverview.open}
          </td>
          <td className="whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-cyan-700 sm:px-6">
            {shareOverview?.dailyChange}
          </td>
          <td className="whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-cyan-700 sm:px-6">
            <button
              type="button"
              className="h-9 w-9 items-center justify-center text-rose-300 hover:text-rose-500"
              onClick={() => {}}
            >
              Remove
            </button>
          </td>
        </tr>
      );
    }
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-16">
      <div className="flex flex-col pt-4">
        <h1 className="py-2 font-bebas text-lg uppercase text-emerald-800">
          General
        </h1>
        <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-emerald-400 bg-emerald-100 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-400">
                  <th className="px-2 py-3 sm:px-6 ">Share</th>
                  <th className="px-2 py-3 sm:px-6 ">Open</th>
                  <th className="px-2 py-3 sm:px-6 ">Daily Change</th>
                  <th className="px-2 py-3 sm:px-6 ">Remove</th>
                </tr>
              </thead>

              <tbody className="bg-white">{watchlistRowData}</tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-4">
        <h1 className="py-2 font-bebas text-lg uppercase text-fuchsia-800">
          Tech
        </h1>
        <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-fuchsia-400 bg-fuchsia-100 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-400">
                  <th className="px-2 py-3 sm:px-6 ">Share</th>
                  <th className="px-2 py-3 sm:px-6 ">Open</th>
                  <th className="px-2 py-3 sm:px-6 ">Daily Change</th>
                  <th className="px-2 py-3 sm:px-6 ">Remove</th>
                </tr>
              </thead>

              <tbody className="bg-white">{watchlistRowData}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const fakeResults: { shareCode: string }[] = [
  {
    shareCode: "TSLA",
  },
  {
    shareCode: "NFLX",
  },
];

const fakeWatchlistData: {
  shareCode: string;
  open: number;
  dailyChange: number;
}[] = [
  {
    shareCode: "AMZN",
    open: 129.98,
    dailyChange: 4.32,
  },
  {
    shareCode: "NVDA",
    open: 237.12,
    dailyChange: 13.46,
  },
  {
    shareCode: "AAPL",
    open: 230.98,
    dailyChange: -2.45,
  },
];

export default function WatchlistIndexPage() {
  const [foundResults, setFoundResults] = useState(true);
  const [watchlistResults, setWatchlistResults] = useState(true);

  return (
    <div className="p-4">
      <form>
        <SearchBar />
        {/* {foundResults && <SearchResults results={fakeResults} />} */}
        {watchlistResults && <Watchlist results={fakeWatchlistData} />}
      </form>
    </div>
  );
}
