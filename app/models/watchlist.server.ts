import _ from "lodash";
import type { DocumentClient } from "aws-sdk/clients/dynamodb";
import memoizee from "memoizee";
import arc from "@architect/functions";
import type {
  SharesToWatch,
  WatchlistData,
  WatchlistTrackerDataItems,
} from "../types/watchlist";
import { mockWatchlistData } from "../mocks/data/mockWatchlistData";

type GetItemOutput = DocumentClient.GetItemOutput;

export async function getShareFromWatchlistByShareCode(
  shareCode: string,
  watchlist: string
): Promise<GetItemOutput> {
  const db = await arc.tables();

  return db.watchlist.get({
    shareCode: shareCode.toUpperCase(),
    watchlist,
  });
}

export async function addShareToWatchlist(
  shareCode: string,
  watchlist: string
): Promise<void> {
  const db = await arc.tables();

  return db.watchlist.put({
    shareCode: shareCode.toUpperCase(),
    watchlist,
    created: Math.floor(Date.now() / 1000),
  });
}

type DeleteItemOutput = DocumentClient.DeleteItemOutput;

export async function removeShareFromWatchlist(
  shareCode: string,
  watchlist: string
): Promise<DeleteItemOutput> {
  const db = await arc.tables();
  return await db.watchlist.delete({
    shareCode,
    watchlist,
  });
}

const getShareDataForWatchlists = memoizee(
  async function getShareWatchlists(
    symbols: string[]
  ): Promise<WatchlistTrackerDataItems> {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.SHARE_API_KEY ?? "abc",
        "X-RapidAPI-Host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
      },
    };

    const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=GB&symbols=${symbols.join(
      ","
    )}`;

    const response = await fetch(url, options)
      .then((response) => response.json())
      .then((response) => response)
      .catch((err) => console.error(err));

    return _.chain(response.quoteResponse.result)
      .map((x) =>
        _.pick(x, [
          "symbol",
          "currency",
          "regularMarketOpen",
          "regularMarketChange",
          "regularMarketChangePercent",
          "fiftyTwoWeekRange",
        ])
      )
      .value();
  },
  {
    maxAge: 21600 * 1000,
    promise: true,
  }
);

export async function getWatchlists(): Promise<WatchlistData> {
  const db = await arc.tables();
  const result = await db.watchlist.scan({});

  const symbols = result?.Items ? _.map(result.Items, "shareCode") : [];

  let getWatchlistShareData: SharesToWatch[] = [];
  if (process.env.NODE_ENV === "development") {
    getWatchlistShareData = await mockWatchlistShareData();
  } else if (symbols.length) {
    getWatchlistShareData = await getShareDataForWatchlists(symbols);
  }

  const results = result?.Items
    ? _.chain(result.Items)
        .map((data) => ({
          ...getWatchlistShareData?.find(
            ({ symbol }) => data.shareCode === symbol
          ),
          ...data,
        }))
        .sortBy("shareCode")
        .groupBy("watchlist")
        .value()
    : {};

  return results;
}

export async function mockWatchlistShareData(): Promise<WatchlistTrackerDataItems> {
  const res = new Response(JSON.stringify(mockWatchlistData()));
  const data = await res.json();

  return _.chain(data.quoteResponse.result)
    .map((x) =>
      _.pick(x, [
        "symbol",
        "currency",
        "regularMarketOpen",
        "regularMarketChange",
        "regularMarketChangePercent",
        "fiftyTwoWeekRange",
      ])
    )
    .value();
}

export { getShareDataForWatchlists };
