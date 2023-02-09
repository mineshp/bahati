import { setupWorker } from "msw";
import loginHandlers from "./login";
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...loginHandlers);
