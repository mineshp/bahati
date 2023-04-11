import { rest } from "msw";

// import mockWatchlistData from "./mswData/mockWatchlistData";

export const handlers = [
  rest.get("http://localhost:3000/watchlist/dashboard", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
      ])
    );
  }),
];
