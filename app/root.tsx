import type {
  LinksFunction,
  // LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
// import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Navbar from "./navbar";
import Footer from "./footer";

import tailwindStylesheetUrl from "./styles/tailwind.css";
// import { getUser } from "./session.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", href: "/_static/favicon.ico" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Arizonia&family=Bebas+Neue&family=Oswald:wght@300;400;700&display=swap"}
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Are you feeling Bahati",
  viewport: "width=device-width,initial-scale=1",
});

// type LoaderData = {
//   user: Awaited<ReturnType<typeof getUser>>;
// };

// export const loader: LoaderFunction = async ({ request }) => {
//   return json<LoaderData>({
//     user: await getUser(request),
//   });
// };

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Navbar />
        <Outlet />
        <ScrollRestoration />
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
