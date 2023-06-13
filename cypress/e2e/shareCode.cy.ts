before(() => {
  cy.viewport("macbook-13");
});

describe("Access to shareCodes route", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });

  it("is successful when user logged in", () => {
    cy.login();
    cy.get('[data-cy="Dashboard"]').click();
    cy.get('[data-cy="share-links"]').find("a").should("have.length", 8);
    cy.get('[data-cy="share-links"]').find("a").first().click({ force: true });
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}shares/VOW3.DE`);
  });

  it("fails and returns 404 when going to non existant route", () => {
    cy.login();
    cy.visit("shares/UNKNOWN", {
      failOnStatusCode: false,
    });
    cy.findByRole("link", { name: /Let's go Home/ }).click({ force: true });
  });

  it("fails and redirects to login page when user not logged in", () => {
    cy.visit("shares/VOW3.DE");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}login`);
    cy.findByRole("button", { name: /Log in/i });
  });
});

describe("User can", () => {
  before(() => {
    cy.login();
    cy.get('[data-cy="Dashboard"]').click();

    cy.get('[data-cy="share-links"]').find("a").should("have.length", 8);

    cy.findByRole("button", {
      name: /shares/i,
    }).click();
    cy.contains("VOW.DE").click();
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}shares/VOW3.DE`);
  });

  it("view share header, displaying currect stock information", () => {
    cy.get('[data-cy="share-logo-name"]').contains("VOW3");
    cy.get('[data-cy="exchange"]').contains("Volkswagon:DE");
    cy.get('[data-cy="day-high"]').contains("148.96 EUR");
    cy.get('[data-cy="day-low"]').contains("141.38 EUR");
    cy.get('[data-cy="current-price"]').contains("148.96 EUR");
  });

  it("view share information bar", () => {
    cy.get('[data-cy="pill-1"]').contains("1 / 0.88p");
    cy.get('[data-cy="pill-2"]').contains("GER");
    cy.get('[data-cy="pill-3"]').contains("37.96");
    cy.get('[data-cy="pill-4"]').contains("29 Units");
    cy.get('[data-cy="pill-5"]').contains("-1.3% / 52W");
    cy.get('[data-cy="pill-6"]').contains("ISA");
  });

  it("view share chart", () => {
    cy.get("canvas").should("be.visible");
    cy.get('select[name="shareInterval"]').find(":selected").contains("5 Days");
  });

  it("view share table headings", () => {
    cy.get('[aria-label="Toggle chart"]').click();
    cy.get("#tableFormat").find("tbody tr").should("have.length", 5);
    cy.get("#tableFormat")
      .find("thead tr th")
      .eq(0)
      .should("have.text", "Date");

    cy.get("#tableFormat")
      .find("thead tr th")
      .eq(1)
      .should("have.text", "Open");

    cy.get("#tableFormat")
      .find("thead tr th")
      .eq(2)
      .should("have.text", "Close");

    cy.get("#tableFormat")
      .find("thead tr th")
      .eq(3)
      .should("have.text", "Daily Change (Value)");

    cy.get("#tableFormat")
      .find("thead tr th")
      .eq(4)
      .should("have.text", "Daily Change (%)");

    cy.get("#tableFormat")
      .find("thead tr th")
      .eq(5)
      .should("have.text", "High");

    cy.get("#tableFormat").find("thead tr th").eq(6).should("have.text", "Low");
  });

  it("view total current value", () => {
    cy.get('[data-cy="currentValue"]')
      .should("have.class", "blur-sm")
      .contains("£shh");

    cy.get('[data-cy="currentValue"]').trigger("click");

    cy.get('[data-cy="currentValue"]')
      .should("not.have.class", "blur-sm")
      .contains("£3,801.46");

    cy.get('[data-cy="currentValue"]').trigger("click");
  });

  it("view total profit/loss", () => {
    cy.get('[data-cy="profitLoss"]')
      .should("have.class", "blur-sm")
      .contains("£shh");

    cy.get('[data-cy="profitLoss"]').click({ force: true });

    cy.get('[data-cy="profitLoss"]')
      .should("not.have.class", "blur-sm")
      .contains("£1,106.42");
  });
});
