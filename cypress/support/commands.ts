export {};

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Logs in with a random user. Yields the user and adds an alias to the user
       *
       * @returns {typeof login}
       * @memberof Chainable
       * @example
       *    cy.login()
       * @example
       *    cy.login({ email: 'whatever@example.com' })
       */
      login: typeof login;
      /**
       * Extends the standard visit command to wait for the page to load
       *
       * @returns {typeof visitAndCheck}
       * @memberof Chainable
       * @example
       *    cy.visitAndCheck('/')
       *  @example
       *    cy.visitAndCheck('/', 500)
       */
      visitAndCheck: typeof visitAndCheck;

      logout: typeof logout;

      isLoggedIn: typeof isLoggedIn;
    }
  }
}

function login() {
  cy.visitAndCheck("/");

  cy.findByRole("textbox", { name: /username/i }).type("testcy");
  cy.findByLabelText(/password/i).type("password");
  cy.findByRole("button", { name: /Log in/i }).click();
  cy.url().should("be.equal", Cypress.config("baseUrl"));
}

function logout(waitTime: number = 1000) {
  cy.visitAndCheck("/");
  cy.get('[data-cy="profile"]').click({ force: true });
  cy.get('[data-cy="signout"]').click({ force: true });
  cy.url().should("be.equal", `${Cypress.config("baseUrl")}login`);
  cy.findByRole("button", { name: /Log in/i });
}

function isLoggedIn() {
  cy.visitAndCheck("/");
  cy.contains("Login").should("not.exist");
}
// We're waiting a second because of this issue happen randomly
// https://github.com/cypress-io/cypress/issues/7306
// Also added custom types to avoid getting detached
// https://github.com/cypress-io/cypress/issues/7306#issuecomment-1152752612
// ===========================================================
function visitAndCheck(url: string, waitTime: number = 1000) {
  cy.visit(url);
  cy.location("pathname").should("contain", url).wait(waitTime);
}

Cypress.Commands.add("login", login);
Cypress.Commands.add("logout", logout);
Cypress.Commands.add("isLoggedIn", isLoggedIn);
Cypress.Commands.add("visitAndCheck", visitAndCheck);
