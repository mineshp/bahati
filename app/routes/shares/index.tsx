import { Link } from "@remix-run/react";

export default function SharesIndexPage() {
  return (
    <p>
      No share selected. Select a share
      <Link to="new" className="text-blue-500 underline">
        Do Something else
      </Link>
    </p>
  );
}
