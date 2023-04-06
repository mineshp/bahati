before(() => {
  cy.viewport("macbook-13");
});

describe("Accessing watchlist dashboard page", () => {
  it("should redirect to login page if accessing watchlist page when not logged in", () => {
    cy.visit("/watchlist/dashboard");

    cy.contains("button", "Log in");

    cy.url().should("be.equal", "http://localhost:3000/login");
  });

  it("should display watchlist page when logged in", () => {
    cy.login();

    cy.visit("/watchlist/dashboard");

    // cy.contains("button", "Log in");

    cy.url().should("be.equal", "http://localhost:3000/watchlist/dashboard");
  });
});
