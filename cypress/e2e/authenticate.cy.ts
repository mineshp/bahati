before(() => {
  cy.viewport("macbook-13");
});

beforeEach(() => {
  cy.visitAndCheck("/");
});

describe("login", () => {
  it("is successful", () => {
    cy.login();
    cy.get("body").find("nav");
    cy.get("nav a").first().should("have.attr", "href");
    cy.url().should("be.equal", "http://localhost:3000/");
  });

  it("fails with password too short", () => {
    cy.findByRole("textbox", { name: /username/i }).type("test-user");
    cy.findByLabelText(/password/i).type("1234");
    cy.findByRole("button", { name: /Log in/i }).click();
    cy.get("form").contains("Password is too short");
  });

  it("fails with password is required", () => {
    cy.findByRole("textbox", { name: /username/i }).type("test-user");
    cy.findByRole("button", { name: /Log in/i }).click();
    cy.get("form").contains("Password is required");
  });

  it("fails with username is invalid", () => {
    cy.findByRole("textbox", { name: /username/i }).type("abc");
    cy.findByLabelText(/password/i).type("123456789");
    cy.findByRole("button", { name: /Log in/i }).click();
    cy.get("form").contains("Username is invalid");
  });

  it("fails with invalid username or password", () => {
    cy.findByRole("textbox", { name: /username/i }).type("test-user");
    cy.findByLabelText(/password/i).type("123456789");
    cy.findByRole("button", { name: /Log in/i }).click();
    cy.get("form").contains("Invalid username or password");
  });
});

describe("logout", () => {
  it("is successful", () => {
    cy.login();
    cy.get("body").find("nav");
    cy.get("nav a").first().should("have.attr", "href");
    cy.logout();
  });
});
