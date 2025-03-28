import data from "../fixtures/index.json";
import "cypress-xpath";

describe("Check category page", () => {
  beforeEach(() => {
    // Intercept API request for blogs
    cy.intercept("GET", "**/api/blogs?page=*", {
      statusCode: 200,
      body: data.blogsResponse.getPaginatedBlogs,
    }).as("paginatedBlogs");

    // Intercept API request for category blogs
    cy.intercept("GET", "**/api/blogs?category=*&page=*", {
      statusCode: 200,
      body: data.blogsResponse.getPaginatedBlogs,
    }).as("categoryBlogs");

    // Intercept API request for blog details
    cy.intercept("GET", "**/api/getBlog*", {
      statusCode: 200,
      body: data.blogsResponse.blogDetail,
    }).as("blogDetail");

    cy.visit("/category");
    cy.url().should("include", "/category");
  });

  it(
    "Clicks all categories one by one and checks if data loads properly",
    { scrollBehavior: "center" },
    () => {
      // Click on each blog category link, verify blog post details, then go back.
      cy.xpath("/html/body/div/div[2]/div[2]/div[1]/a")
        .should("exist")
        .each(($blog) => {
          cy.wrap($blog)
            .invoke("attr", "href")
            .then((href) => {
              if (href) {
                cy.visit(href);
                cy.url().should("include", "/blog-post");
                cy.wait("@blogDetail");
                cy.go("back");
                cy.wait(100);
                cy.url().should("include", "/category");
                cy.contains("h1", "Categories").should("be.visible");
              }
            });
        });

      // Ensure that the category div elements are visible before clicking.
      cy.xpath("/html/body/div/div[2]/div[2]/div[2]/div[1]/div")
        .find("div")
        .should("exist")
        .should("be.visible")
        .each(($el) => {
          cy.wrap($el).click();
          cy.url().should("include", "/category");
        });

      // Capture the page number text into an alias.
      cy.xpath("/html/body/div/div[2]/div[2]/div[1]/div/p")
        .invoke("text")
        .as("pageNum");

      // Function to recursively click the "Next >" button until it is disabled.
      function paginateForward() {
        cy.wait(200);
        cy.contains("button", "Next >")
          .should("exist")
          .should("be.visible")
          .then(($button) => {
            // Use the raw DOM property to check for the disabled state.
            const isDisabled = $button[0].disabled;
            if (isDisabled) {
              return;
            }
            cy.wrap($button)
              .click()
              .then(() => {
                cy.get("@pageNum").then((pageNum) => {
                  cy.url().should("include", `page=${pageNum}`);
                });
                paginateForward();
              });
          });
      }
      paginateForward();

      // Function to recursively click the "< Prev" button until it is disabled.
      function paginateBackward() {
        cy.wait(200);
        cy.contains("button", "< Prev")
          .should("exist")
          .should("be.visible")
          .then(($button) => {
            const isDisabled = $button[0].disabled;
            if (isDisabled) {
              return;
            }
            cy.wrap($button)
              .click()
              .then(() => {
                cy.get("@pageNum").then((pageNum) => {
                  cy.url().should("include", `page=${pageNum}`);
                });
                paginateBackward();
              });
          });
      }
      paginateBackward();
    }
  );
});
