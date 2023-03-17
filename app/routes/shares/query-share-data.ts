import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  getSharesByCodeAndPeriod,
  mockGetSharesByCodeAndPeriod,
} from "~/models/shares.server";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const shareCode = url.searchParams.get("shareCode");
  const range = url.searchParams.get("range");
  const interval = url.searchParams.get("interval");

  let data;
  if (process.env.NODE_ENV === "development") {
    data = await mockGetSharesByCodeAndPeriod(
      shareCode as string,
      range as string,
      interval as string
    );
  } else {
    data = await getSharesByCodeAndPeriod(
      shareCode as string,
      range as string,
      interval as string
    );
  }
  return json(data);
};
