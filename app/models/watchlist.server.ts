import _ from "lodash";
// import memoizee from "memoizee";
import arc from "@architect/functions";
import type { WatchlistData } from "../types/shares";

// const mockWatchlists = {
//   general: [
//     {
//       name: "AMZN",
//       open: 213.88,
//       dailyChange: 12.2,
//     },
//     {
//       name: "FOO",
//       open: 123.88,
//       dailyChange: 12.2,
//     },
//   ],
//   tech: [
//     {
//       name: "BAR",
//       open: 13.12,
//       dailyChange: 2.2,
//     },
//     {
//       name: "BAZ",
//       open: 89.76,
//       dailyChange: -3.4,
//     },
//     {
//       name: "ZOO",
//       open: 198,
//       dailyChange: 2.56,
//     },
//   ],
// };

export async function getWatchlists(): Promise<WatchlistData> {
  const db = await arc.tables();
  const result = await db.watchlist.scan({});

  return _.chain(result.Items).sortBy("name").groupBy("watchlist").value();
}

export async function addShareToWatchlist(
  shareCode: string,
  watchlist: string
): Promise<void> {
  const db = await arc.tables();
  return db.watchlist.put({
    shareCode,
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
