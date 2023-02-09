import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { createUser } from "~/models/user.server";
import { createUserSession } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  if (process.env.NODE_ENV === "production") {
    console.error(
      "🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 test routes should not be enabled in production 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨"
    );
    // test routes should not be enabled in production or without
    // enable test routes... Just in case this somehow slips through
    // we'll redirect :)
    return redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  }

  const { username } = await request.json();
  if (!username) {
    throw new Error("username required for login");
  }
  if (username !== "test-user") {
    throw new Error("All test usernames must be test-user");
  }

  const user = await createUser(username, "myreallystrongpassword");

  return createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: "/",
  });
};

export default null;
