import { Link } from "@remix-run/react";

export default function WatchlistIndexPage() {
  return (
    <p>
      No route exists here
      <Link to="new" className="text-blue-500 underline">
        Do Something else
      </Link>
    </p>
  );
}
