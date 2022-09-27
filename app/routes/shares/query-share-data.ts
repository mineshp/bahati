import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getSharesByCodeAndPeriod } from "~/models/shares.server";

export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url)
  const shareCode = url.searchParams.get('shareCode')
  const start = url.searchParams.get('start')
  console.log('route');
  console.log(start);
  const end = url.searchParams.get('end')
  console.log(end);
  const data = await getSharesByCodeAndPeriod(shareCode as string, start as string, end as string);
  return json(data)
}