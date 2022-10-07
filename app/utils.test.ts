import { validateUsername } from "./utils";

test("validateUsername returns false for non-usernames", () => {
  expect(validateUsername(undefined)).toBe(false);
  expect(validateUsername(null)).toBe(false);
  expect(validateUsername("")).toBe(false);
});

test("validateUsername returns true for usernames", () => {
  expect(validateUsername("kody")).toBe(true);
});
