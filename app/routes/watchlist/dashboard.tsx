import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import type { RefObject } from "react";
import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  useActionData,
  useCatch,
  useLoaderData,
  useFetcher,
  useTransition,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { TrashIcon } from "@heroicons/react/outline";
import type { WatchlistData, SharesToWatch } from "../../types/watchlist";
import {
  getWatchlists,
  addShareToWatchlist,
  removeShareFromWatchlist,
} from "~/models/watchlist.server";
import { getUserId } from "~/session.server";
import ErrorPage from "../../components/library/error";
import { currencySymbol } from "../../utils/shares";
import Alert from "../../components/library/alert";
import LoadingSpinner from "../../components/library/loadingSpinner";

type LoaderData = {
  watchlists: Awaited<ReturnType<typeof getWatchlists>>;
};

type ActionData = {
  errors?: {
    shareCode?: string;
    action?: string;
    message?: string;
  };
};

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

function SearchBar(prop: {
  shareCodeRef: RefObject<HTMLInputElement>;
  actionData: ActionData;
  isAdding: boolean | undefined;
}) {
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
          name="watchlistName"
          data-te-select-init
          onChange={(e) => {}}
          data-cy="watchlist-select"
          className="block rounded-l-lg border border-rose-500 bg-rose-500 p-[9.5px] text-white hover:bg-rose-600 focus:border-rose-600 focus:ring-rose-600"
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
          ref={prop.shareCodeRef}
          id="shareCode"
          name="shareCode"
          type="text"
          className="z-20 block w-full rounded-r-lg border border-l-2 border-gray-300 border-l-gray-100 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-rose-500 focus:ring-rose-500 dark:border-rose-300 dark:bg-rose-200 dark:text-white dark:placeholder-gray-400 dark:focus:border-rose-500"
          placeholder="Enter share code..."
          aria-invalid={prop.actionData?.errors?.shareCode ? true : undefined}
          aria-errormessage={
            prop.actionData?.errors?.shareCode ? "shareCode-error" : undefined
          }
        />
        {prop.actionData?.errors?.shareCode && (
          <span className="inline-flex pt-2 text-sm text-red-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 pr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            {prop.actionData.errors.shareCode}
          </span>
        )}
        <button
          type="submit"
          name="intent"
          value="add"
          data-cy="add"
          className="absolute top-0 right-0 rounded-r-lg border border-rose-500 bg-rose-500 p-2.5 text-sm font-medium text-white hover:bg-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-300 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-600"
          disabled={prop.isAdding}
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Edit / Add_Plus">
              <path
                id="Vector"
                d="M6 12H12M12 12H18M12 12V18M12 12V6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

interface WatchlistProps {
  results: WatchlistData;
  isRemoving: (shareToRemove: string) => boolean;
}

function showShareValueJumpOrDropIndicators(value: number) {
  return value && value > 0 ? "text-green-600" : "text-red-700";
}

function displayPriceWithCurrency(
  currency: string | undefined,
  value: number | undefined
): string {
  switch (currency) {
    case "USD":
      return `${currencySymbol(currency)}${value?.toFixed(2)}`;
    case "GBp":
      return `${value?.toFixed(2)}${currencySymbol(currency)}`;
    case "EUR":
      return `${currencySymbol(currency)} ${value?.toFixed(2)}`;
    default:
      return "";
  }
}

function Watchlist(prop: WatchlistProps) {
  const keys = Object.keys(prop.results);
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:gap-16">
      {keys.map((key: string) => (
        <div className="flex flex-col pt-4" key={key}>
          <h1 className="py-2 font-bebas text-lg uppercase text-emerald-800">
            {key}
          </h1>
          <div className="-my-2 overflow-x-auto py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="inline-block min-w-full overflow-hidden border-b border-gray-200 align-middle shadow sm:rounded-lg">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-emerald-400 bg-emerald-100 text-left text-xs font-medium uppercase leading-4 tracking-wider text-gray-400">
                    <th className="px-2 py-3 sm:px-6 ">Share</th>
                    <th className="px-2 py-3 sm:px-6 ">Open</th>
                    <th className="hidden px-2 py-3 sm:table-cell sm:px-6">
                      52 Week Range
                    </th>
                    <th className="px-2 py-3 sm:px-6 ">Daily Change</th>
                    <th className="px-2 py-3 sm:px-6 ">Daily Change (%)</th>
                    <th className="px-2 py-3 text-center sm:px-6">Remove</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {prop.results[key].map(
                    (
                      shareOverview: Pick<
                        SharesToWatch,
                        | "shareCode"
                        | "currency"
                        | "regularMarketOpen"
                        | "regularMarketChange"
                        | "regularMarketChangePercent"
                        | "watchlist"
                        | "fiftyTwoWeekRange"
                      >
                    ) => (
                      <tr
                        key={`${shareOverview.shareCode}_${shareOverview.watchlist}`}
                        className={`
                          ${
                            shareOverview.regularMarketOpen
                              ? "bg-white text-cyan-700"
                              : "bg-gray-100 text-gray-800"
                          }
                        `}
                      >
                        <td className="whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-cyan-700 sm:px-6">
                          {shareOverview.shareCode}
                        </td>
                        <td
                          className={`whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-gray-400  sm:px-6`}
                        >
                          {displayPriceWithCurrency(
                            shareOverview?.currency,
                            shareOverview.regularMarketOpen
                          ) ?? "Stock not found"}
                        </td>
                        <td
                          className={`whitespace-no-wrap hidden border-b border-gray-200 px-2 py-4 text-sm text-gray-400 sm:table-cell sm:px-6`}
                        >
                          {shareOverview?.fiftyTwoWeekRange}
                        </td>
                        <td
                          className={`whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm ${
                            shareOverview?.regularMarketChange &&
                            showShareValueJumpOrDropIndicators(
                              shareOverview?.regularMarketChange
                            )
                          } sm:px-6`}
                        >
                          {displayPriceWithCurrency(
                            shareOverview?.currency,
                            shareOverview?.regularMarketChange
                          )}
                        </td>
                        <td
                          className={`whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-gray-400 ${
                            shareOverview?.regularMarketChangePercent &&
                            showShareValueJumpOrDropIndicators(
                              shareOverview?.regularMarketChangePercent
                            )
                          } sm:px-6`}
                        >
                          {shareOverview.regularMarketChangePercent?.toFixed(2)}
                          %
                        </td>
                        <td className="whitespace-no-wrap border-b border-gray-200 px-2 py-4 text-sm text-cyan-700 sm:px-6">
                          <button
                            type="submit"
                            className="mx-auto block items-center justify-center text-rose-300 hover:text-rose-500"
                            name="intent"
                            value={`delete_${shareOverview.shareCode}_${shareOverview.watchlist}`}
                            data-cy="remove"
                            disabled={prop.isRemoving(
                              shareOverview.shareCode as string
                            )}
                          >
                            {prop.isRemoving(
                              shareOverview.shareCode as string
                            ) ? (
                              <LoadingSpinner type="small" />
                            ) : (
                              <TrashIcon
                                className="w-5 sm:w-6"
                                aria-hidden="true"
                              />
                            )}
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return redirect("/login");

  const watchlists = await getWatchlists();
  return json({ watchlists });
};

export const action: ActionFunction = async ({ request }) => {
  // TODO: Update type
  const formData: any = await request.formData();
  const intent = formData.get("intent");
  const shareName = formData.get("shareCode");

  if (intent === "add") {
    if (!shareName) {
      return json<ActionData>(
        { errors: { shareCode: "share code is required" } },
        { status: 400 }
      );
    }
    const watchlist = formData.get("watchlistName");

    try {
      await addShareToWatchlist(shareName, watchlist);
    } catch (err) {
      console.error(err);
      return {
        errors: {
          action: "add",
          message: "failed to add share to watchlist, please try again!",
        },
      };
    }
  }

  const [action, shareCode, watchlist] = intent.split("_");
  if (action === "delete") {
    try {
      await removeShareFromWatchlist(shareCode, watchlist);
    } catch (err) {
      console.error(err);
      return {
        errors: {
          action: "delete",
          message: "failed to delete share from watchlist, please try again!",
        },
      };
    }
  }

  const watchlists = await getWatchlists();
  return json({ watchlists });
};

export default function WatchlistDashboardPage() {
  const actionData = useActionData() as ActionData;
  const shareCodeRef = useRef<HTMLInputElement>(null);
  const { watchlists } = useLoaderData() as LoaderData;
  const fetcher = useFetcher();
  const transition = useTransition();

  const intent = transition?.submission?.formData.get("intent");
  const isAdding = intent === "add" && transition.state === "submitting";

  const isRemoving = (shareCodeToRemove: string) =>
    (intent as string)?.split("_")[0] === "delete" &&
    transition.state === "submitting" &&
    transition.submission.formData.get("shareCode") === shareCodeToRemove;

  const [watchlistRes, setWatchlistRes] = useState<WatchlistData>({});

  useEffect(() => {
    if (actionData?.errors?.shareCode) {
      shareCodeRef.current?.focus();
    }
  }, [actionData]);

  useEffect(() => {
    if (Object.keys(watchlists)) {
      setWatchlistRes(watchlists);
    } else {
      setWatchlistRes(watchlistRes);
    }
  }, [watchlistRes, watchlists]);

  useEffect(() => {
    if (fetcher.data) {
      setWatchlistRes(fetcher.data);
    }
  }, [fetcher]);

  return (
    <div className="p-4">
      <Form method="post">
        <SearchBar
          shareCodeRef={shareCodeRef}
          actionData={actionData}
          isAdding={isAdding}
        />
        {actionData?.errors?.action && actionData?.errors?.message && (
          <div className="mt-4">
            <Alert
              type="error"
              heading={`Error occurred!`}
              subHeading={actionData?.errors?.message}
            />
          </div>
        )}

        {isAdding ? (
          <LoadingSpinner type="medium" />
        ) : (
          <div>
            {watchlistRes && Object.keys(watchlistRes).length > 0 ? (
              <Watchlist results={watchlistRes} isRemoving={isRemoving} />
            ) : (
              <div className="mt-4">
                <Alert
                  type="alert"
                  heading="No watchlists setup"
                  subHeading="Add shares to watchlists, to start tracking."
                />
              </div>
            )}
          </div>
        )}
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <ErrorPage message={error.message} />;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Watchlist not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
