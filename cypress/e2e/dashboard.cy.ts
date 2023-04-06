before(() => {
  cy.viewport("macbook-13");
});

beforeEach(() => {
  cy.login();
});

describe("Dashboard", () => {
  it("displays share links correctly", () => {
    cy.get('[data-cy="share-links"]').find("a").should("have.length", 8);
  });

  it("displays share drop down", () => {
    // cy.get('[data-cy="share-links"]').find("a").should("have.length", 8);
  });
});
