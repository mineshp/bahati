/*
  This will tell esbuild to exclude the library from the bundle, and instead load it at runtime from a CDN or other external source.
*/

export const build = {
  // Exclude from the bundle
  esbuildExternals: ["aws-sdk"],
};
