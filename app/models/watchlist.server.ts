import _ from "lodash";
import memoizee from "memoizee";
import arc from "@architect/functions";
import type { WatchlistData, WatchlistTrackerDataItems } from "../types/shares";
import { mockWatchlistData } from "~/mocks/mockWatchlistData";

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

export async function removeShareFromWatchlist(
  shareCode: string,
  watchlist: string
): Promise<void> {
  const db = await arc.tables();
  // TODO: Check what delete returns, type void not correct
  await db.watchlist.delete({
    shareCode,
    watchlist,
  });
  return;
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

  const symbols = _.map(result.Items, "shareCode");

  let getWatchlistShareData = [{ symbol: "default" }];
  if (process.env.NODE_ENV === "development") {
    getWatchlistShareData = await mockWatchlistShareData([]);
  } else {
    getWatchlistShareData = await getShareDataForWatchlists(symbols);
  }

  return _.chain(result.Items)
    .map((data) => ({
      ...getWatchlistShareData?.find(({ symbol }) => data.shareCode === symbol),
      ...data,
    }))
    .sortBy("shareCode")
    .groupBy("watchlist")
    .value();
}

export async function mockWatchlistShareData(
  symbols: string[]
): Promise<WatchlistTrackerDataItems> {
  const res = new Response(JSON.stringify(mockWatchlistData(symbols)));
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