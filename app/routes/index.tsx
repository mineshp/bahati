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
        <div className="items-center content-center self-center text-3xl text-left sm:text-3xl lg:text-5xl md:text-4xl font-oswald">
          <div className="p-2 opacity-80">
            <h1 className="text-indigo-200">Every great dream begins with a <span className="text-4xl sm:text-5xl lg:text-6xl text-rose-100">dreamer</span>.</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-around h-auto bg-rose-100 sm:h-80 bg-[url('/_static/crosspattern2.svg')] pb-4">
        <div className="flex items-center content-center self-center"><img
          className="items-center content-center self-center block w-48 mx-auto sm:w-64"
          src="/_static/bahati_logo.png"
          alt="Bahati"
        />
        </div>
        <div className="grid grid-cols-2 p-4 mt-4 md:grid-cols-3 md:p-12 lg:p-8 gap-x-12 md:gap-8 gap-y-8">
          {shares.map((item) => (
            <Link
              className="w-32 h-10 py-2 text-center text-white border rounded-md hover:border-indigo-300 drop-shadow-md bg-gradient-to-r hover:from-indigo-200 hover:to-indigo-400 from-rose-400 border-rose-300 to-rose-200 bg-rose-300"
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
