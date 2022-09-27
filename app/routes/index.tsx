import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

const shares = [
  { name: 'VOW.DE', href: "/shares/VOW3.DE" },
  { name: 'NFLX', href: "/shares/NFLX" },
  { name: 'BP.L', href: "/shares/BP.L" },
  { name: 'TSLA', href: "/shares/TSLA" },
  { name: 'SPCE', href: "/shares/SPCE" },
  { name: 'ROO.L', href: "/shares/ROO.L" },
  { name: 'ENR', href: "/shares/ENR" },
  { name: 'BABA', href: "/shares/BABA" },
]

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="antialiased">
      <div className="flex flex-wrap p-8 bg-[url('/_static/ubud-capella.jpg')] bg-cover opacity-80 h-96">
        <div className="items-center content-center self-center text-3xl text-left sm:text-3xl lg:text-5xl md:text-4xl font-oswald text-rose-400">
          <h1>Every great dream begins with a <span className="text-4xl sm:text-5xl lg:text-6xl text-rose-600">dreamer</span>.</h1>
          <p className="pt-4 text-sm text-indigo-300 md:text-lg lg:text-xl font-bebas">Real time stock information, easy to track your portfolio.</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-around h-auto bg-rose-100 sm:h-80">
        <div className="flex items-center content-center self-center"><img
          className="items-center content-center self-center block w-48 mx-auto sm:w-64"
          src="/_static/bahati_logo.png"
          alt="Bahati"
        />
        </div>
        <div className="grid grid-cols-2 p-4 mt-4 md:grid-cols-3 md:p-12 lg:p-8 gap-x-12 md:gap-8 gap-y-8">
          {shares.map((item) => (
            <Link
              className="w-32 h-10 py-2 text-center text-white border border-indigo-300 rounded-md drop-shadow-md bg-gradient-to-r from-indigo-200 to-indigo-400 hover:from-rose-400 hover:border-rose-300 hover:to-rose-200 hover:bg-rose-300"
              to={{
                pathname: item.href
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
