import { setupServer } from "msw/node";
import loginHandlers from "./login";

// const handlers = [...loginHandlers];

if (typeof window === "undefined") {
  const server = setupServer(...loginHandlers);
  // server.printHandlers();

  server.listen({ onUnhandledRequest: "error" });
  console.log("Running mock server using node...");

  process.once("SIGINT", () => server.close());
  process.once("SIGTERM", () => server.close());
} else {
  const { worker } = require("./browser");
  console.log("Running mock server in the browser...");
  worker.start();
}
