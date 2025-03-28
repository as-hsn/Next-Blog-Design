import data from "../fixtures/index.json";

describe("About Page", () => {
  beforeEach(() => {
    // Intercept API request for authors on homepage
    cy.intercept("GET", "**/api/authors", {
      statusCode: 200,
      body: data.authorsResponse.getAuthors,
    }).as("getAuthors");
    // Intercept API request for authors
    cy.intercept("POST", "**/api/authors", {
      statusCode: 200,
      body: data.authorsResponse.authorsDetail,
    }).as("postAuthors");
    cy.visit("/about");
    cy.url().should("include", "/about");
  });
  it("should render the main heading", () => {
    cy.get("nav").should("be.visible");
    cy.contains("h2", "ABOUT US");
    cy.contains("h1", "Our team of creatives");
    cy.contains("h1", "Why we started this Blog");

    cy.contains("h1", "List of Authors").scrollIntoView();
    cy.get('div[data-id="authors_parent_div"] a')
      .should("be.visible")
      .each(($el) => {
        cy.wrap($el)
          .invoke("attr", "href")
          .then((href) => {
            if (href) {
              cy.visit(href);
              cy.url().should("include", href);
              cy.wait("@postAuthors");
              cy.contains("h1", "My Posts").should("be.visible");
              cy.go("back");
              cy.contains("h1", "List of Authors").should("be.visible");
            }
          });
      });
  });
});
