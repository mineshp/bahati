import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getExchangeRate } from "~/models/shares.server";

export const loader: LoaderFunction = async ({request}) => {
  const url = new URL(request.url)
  const baseCurrency = url.searchParams.get('baseCurrency')
  const data = await getExchangeRate(baseCurrency as string);
  return json(data)
}