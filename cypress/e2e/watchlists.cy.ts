before(() => {
  cy.viewport("macbook-13");
});

describe("Access to watchlists route", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });

  it("is successful when user logged in", () => {
    cy.login();
    cy.get('[data-cy="Watchlist"]').click();
    cy.contains("No watchlists setup").should("be.visible");
    cy.url().should(
      "be.equal",
      `${Cypress.config("baseUrl")}watchlist/dashboard`
    );
  });

  it("fails and returns 404 when going to non existant route", () => {
    cy.login();
    cy.visit("watchlist/dashboard/unknown", {
      failOnStatusCode: false,
    });
    cy.contains("Page not found").should("be.visible");
    cy.findByRole("link", { name: /Let's go home/i }).click();
  });

  it("fails and redirects to login page when user not logged in", () => {
    cy.visit("watchlist/dashboard");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}login`);
    cy.findByRole("button", { name: /Log in/i });
  });
});

describe("User can", () => {
  beforeEach(() => {
    cy.login();
    cy.get('[data-cy="Watchlist"]').click();

    cy.contains("No watchlists setup").should("be.visible");
    cy.get('[data-cy="watchlist-select"]').wait(200); // Dropdown is disabled initially
  });

  it("add a share to a watchlist", () => {
    cy.get('[data-cy="watchlist-select"]')
      .should("not.be.disabled")
      .select("Tech");
    cy.get("input").type("testcode");
    cy.get('[data-cy="add"]').click();

    cy.get("h1").contains("tech");

    cy.get("table").contains("td", "TESTCODE");
  });

  it("should remove a share from a watchlist", () => {
    cy.get("table").contains("td", "TESTCODE");
    cy.get('[data-cy="remove"]').last().click();
    cy.wait(200);
    cy.contains("No watchlists setup").should("be.visible");
  });

  it("should retrieve share tracking information once added to a watchlist", () => {
    cy.get('[data-cy="watchlist-select"]')
      .should("not.be.disabled")
      .select("Tech");
    cy.get("input").type("moon");
    cy.get('[data-cy="add"]').click();

    cy.get("tr td:nth-child(1)").contains("MOON").should("be.visible");

    cy.get("tr td:nth-child(2)").contains("$199.91").should("be.visible");

    cy.get("tr td:nth-child(3)")
      .contains("101.81 - 384.29")
      .should("be.visible");

    cy.get("tr td:nth-child(4)").contains("-12.43").should("be.visible");

    cy.get("tr td:nth-child(5)").contains("-5.99%").should("be.visible");
  });
});
