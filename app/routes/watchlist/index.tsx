import { useState } from "react";

function SearchBar() {
  return (
    <div>
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-rose-800"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            aria-hidden="true"
            className="h-5 w-5 text-gray-500 dark:text-gray-400"
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
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-rose-50 p-4 pl-10 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500 dark:border-rose-600 dark:bg-rose-200 dark:text-rose-800 dark:placeholder-gray-400 dark:focus:border-indigo-500 dark:focus:ring-indigo-500"
          placeholder="Search share code..."
          required
        />
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 rounded-lg bg-indigo-700 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
        >
          Search
        </button>
      </div>
    </div>
  );
}

interface SearchResultsProps {
  results: {
    shareCode: string;
  }[];
}

function SearchResults(prop: SearchResultsProps) {
  const rowData = prop.results.map((result: { shareCode: string }) => {
    return (
      <tr key={`${result.shareCode}`}>
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
          {result.shareCode}
        </td>
        <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
          <button
            type="button"
            className="items-center text-indigo-300 hover:text-indigo-500"
            onClick={() => {}}
          >
            Add to Watchlist
          </button>
        </td>
      </tr>
    );
  });

  return rowData.length ? (
    <div className="flex flex-col pt-4">
      <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
          <table className="min-w-full">
            <tbody className="bg-white">{rowData}</tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <div className="p-4 text-gray-400">No results found</div>
  );
}

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
          <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
            {shareOverview.shareCode}
          </td>
          <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
            {shareOverview.open}
          </td>
          <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
            {shareOverview?.dailyChange}
          </td>
          <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4 text-sm text-cyan-800">
            <button
              type="button"
              className="h-9 w-9 items-center justify-center text-indigo-300 hover:text-indigo-500"
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
    <div className="flex flex-col pt-4">
      <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-blue-400 bg-indigo-100 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-400">
                <th className="px-6 py-3 ">Share</th>
                <th className="px-6 py-3 ">Open</th>
                <th className="px-6 py-3 ">Daily Change</th>
                <th className="px-6 py-3 ">Remove</th>
              </tr>
            </thead>

            <tbody className="bg-white">{watchlistRowData}</tbody>
          </table>
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
        {foundResults && <SearchResults results={fakeResults} />}
        {watchlistResults && <Watchlist results={fakeWatchlistData} />}
      </form>
    </div>
  );
}
