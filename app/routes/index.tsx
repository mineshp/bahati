import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { getUserId } from "~/session.server";

const shares = [
  { name: "VOW.DE", href: "/shares/VOW3.DE" },
  { name: "NFLX", href: "/shares/NFLX" },
  { name: "BP.L", href: "/shares/BP.L" },
  { name: "TSLA", href: "/shares/TSLA" },
  { name: "SPCE", href: "/shares/SPCE" },
  { name: "ROO.L", href: "/shares/ROO.L" },
  { name: "ENR", href: "/shares/ENR" },
  { name: "BABA", href: "/shares/BABA" },
];

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  // If no user detected, redirect to login page
  if (!userId) return redirect("/login");
  return json({});
};

export default function Index() {
  return (
    <main className="z-15 antialiased">
      <div className="flex h-96 flex-wrap bg-[url('/_static/ubud-capella.jpg')] bg-cover p-8 opacity-80">
        <div className="content-center items-center self-center text-left font-oswald text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
          <div className="p-2 opacity-80">
            <h1 className="text-indigo-200">
              Every great dream begins with a{" "}
              <span className="text-4xl text-rose-100 sm:text-5xl lg:text-6xl">
                dreamer
              </span>
              .
            </h1>
          </div>
        </div>
      </div>
      <div className="flex h-auto flex-row flex-wrap justify-around bg-rose-100 bg-[url('/_static/crosspattern2.svg')] pb-4 sm:h-80">
        <div className="flex content-center items-center self-center">
          <img
            className="mx-auto block w-48 content-center items-center self-center sm:w-64"
            src="/_static/bahati_logo.png"
            alt="Bahati"
          />
        </div>
        <div
          className="mt-4 grid grid-cols-2 gap-x-12 gap-y-8 p-4 md:grid-cols-3 md:gap-8 md:p-12 lg:p-8"
          data-cy="share-links"
        >
          {shares.map((item) => (
            <Link
              className="h-10 w-32 rounded-md border border-rose-300 bg-rose-300 bg-gradient-to-r from-rose-400 to-rose-200 py-2 text-center text-white drop-shadow-md hover:border-indigo-300 hover:from-indigo-200 hover:to-indigo-400"
              to={{
                pathname: item.href,
              }}
              key={item.name}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
