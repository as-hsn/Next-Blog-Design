import data from "../fixtures/index.json";

describe("Visit blog page and click all blogs to open blog detail", () => {
  beforeEach(() => {
    // Intercept API requests
    cy.intercept("GET", "**/api/getBlog?slug=*", {
      statusCode: 200,
      body: data.blogsResponse.blogDetail,
    }).as("blog_detail");

    cy.intercept("GET", "**/api/blogs?page=*", {
      statusCode: 200,
      body: data.blogsResponse.getPaginatedBlogs,
    }).as("paginated_blogs");

    cy.visit("/blog");
    cy.url().should("include", "/blog");
  });

  it("Visit blog page and click all blogs to open blog detail", () => {
    cy.contains(/Read Blogs >/i)
      .should("be.visible")
      .click();

    // Iterate over all blog links and visit them
    cy.get('div[data-id="blogs_parent_div"] a')
      .should("be.visible")
      .each(($el) => {
        cy.wrap($el)
          .invoke("attr", "href")
          .then((href) => {
            if (href) {
              cy.visit(href);
              cy.url().should("include", "/blog-post/");
              cy.wait("@blog_detail");
              cy.go("back");
              cy.wait("@paginated_blogs");
            }
          });
      });

    cy.wait(500);

    // Navigate forward until "Next >" is disabled
    function paginateForward() {
      cy.contains("button", "Next >")
        .should("exist")
        .should("be.visible")
        .then(($button) => {
          if (!$button.is(":disabled")) {
            cy.wrap($button).click();
            cy.wait("@paginated_blogs");
            cy.get('div[data-id="blogs_parent_div"] a').should("be.visible");
            paginateForward();
          }
        });
    }
    paginateForward();

    // Navigate backward until "< Prev" is disabled
    function paginateBackward() {
      cy.contains("button", "< Prev")
        .should("exist")
        .should("be.visible")
        .then(($button) => {
          if (!$button.is(":disabled")) {
            cy.wrap($button).click();
            cy.wait("@paginated_blogs");
            cy.get('div[data-id="blogs_parent_div"] a').should("be.visible");
            paginateBackward();
          }
        });
    }
    paginateBackward();
  });
});
