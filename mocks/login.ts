import { rest } from "msw";

// const handlers = [
//   rest.post("/login", (req, res, ctx) => {
//     console.log("MINESH");
//     // Persist user's authentication in the session
//     sessionStorage.setItem("__cookie", "abc");
//     return res(ctx.status(204));
//   }),
//   rest.get("/", (req, res, ctx) => {
//     // Check if the user is authenticated in this session
//     // const isAuthenticated = sessionStorage.getItem("is-authenticated");
//     // if (!isAuthenticated) {
//     //   // If not authenticated, respond with a 403 error
//     //   return res(
//     //     ctx.status(403),
//     //     ctx.json({
//     //       errorMessage: "Not authorized",
//     //     })
//     //   );
//     // }
//     // If authenticated, return a mocked user details
//     return res(
//       ctx.status(200),
//       ctx.json({
//         user: {
//           id: "username#admin",
//           username: "admin",
//         },
//       })
//     );
//   }),
// ];

const handlers = [
  // Handles a POST /login request
  // rest.post("http://localhost:3000/login", (req, res, ctx) => {
  //   console.log();
  //   return res(ctx.status(204));
  // }),
  // // Handles a GET /user request
  // rest.get("http://localhost:3000/", (req, res, ctx) => {
  //   console.log("IN THE GET");
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       user: {
  //         id: "username#admin",
  //         username: "admin",
  //       },
  //     })
  //   );
  // }),
  rest.post("http://localhost:2222/_arc/ssm", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/login", (req, res, ctx) => {
    return res(ctx.status(204));
  }),
  // Handles a GET /user request
  rest.get("/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: "username#admin",
          username: "admin",
        },
      })
    );
  }),
];

export default handlers;
