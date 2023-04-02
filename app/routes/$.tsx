import { json } from "@remix-run/node";
import ErrorPage from "../components/library/error";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function ErrorSplat() {
  return <ErrorPage message={"Page not found"} />;
}
