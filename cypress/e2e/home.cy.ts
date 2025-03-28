import "cypress-xpath";
import data from "../fixtures/index.json";

const PAGES = {
  blog: {
    url: "/blog",
    heading: "All posts",
    dataId: "[data-id='blogs_parent_div']",
  },
  about: {
    url: "/about",
    heading: "List of Authors",
    dataId: "[data-id='authors_parent_div']",
  },
  contact: { url: "/contact", heading: "Let’s Start a Conversation" },
  register: { url: "/register", heading: "Sign Up" },
};

describe("Visit whole dashboard and visit also blog detail and author detail", () => {
  beforeEach(() => {
    // Intercept API request for authors on homepage
    cy.intercept("GET", "**/api/authors", {
      statusCode: 200,
      body: data.authorsResponse.getAuthors,
    }).as("getAuthors");
    // Intercept API request for blogs
    cy.intercept("GET", "**/api/blogs?page=*", {
      statusCode: 200,
      body: data.blogsResponse.getPaginatedBlogs,
    }).as("getPaginatedBlogs");
    // Profile page user details get api
    cy.intercept("GET", "**/api/auth/user", {
      statusCode: 200,
      body: data.usersResponse.getUserDetails,
    }).as("getUserDetails");
    // Intercept API request for blog
    cy.intercept("GET", "**/api/getBlog*", {
      statusCode: 200,
      body: data.blogsResponse.blogDetail,
    }).as("blogDetail");

    // Intercept API request for category Blog
    cy.intercept("GET", "**/api/blogs?category=*&page=*", {
      statusCode: 200,
      body: data.blogsResponse.getCategoryBlogs,
    }).as("getCategoryBlogs");

    // Intercept API request for authors
    cy.intercept("POST", "**/api/authors", {
      statusCode: 200,
      body: data.authorsResponse.authorsDetail,
    }).as("authorsDetail");

    cy.visit("/");
    cy.url().should("include", "/");
  });

  it("Clicks each link inside the header <ul>", () => {
    cy.get("ul a").each(($link) => {
      const href = $link.attr("href");
      if (href === PAGES.blog.url) {
        cy.wrap($link).should("be.visible").click();
        cy.url().should("include", PAGES.blog.url);
        cy.contains("h1", PAGES.blog.heading).scrollIntoView();
        cy.wait("@getPaginatedBlogs");
        cy.get(PAGES.blog.dataId).should("be.visible");
      } else if (href === PAGES.about.url) {
        cy.wrap($link).should("be.visible").click();
        cy.url().should("include", PAGES.about.url);
        cy.contains("h1", PAGES.about.heading).scrollIntoView();
        cy.wait("@getAuthors");
        cy.get(PAGES.about.dataId).should("be.visible");
      } else if (href === PAGES.contact.url) {
        cy.wrap($link).should("be.visible").click();
        cy.url().should("include", PAGES.contact.url);
        cy.contains("h1", PAGES.contact.heading).should("be.visible");
      } else if (href === PAGES.register.url) {
        cy.wrap($link).should("be.visible").click();
        cy.url().should("include", PAGES.register.url);
        cy.contains("h1", PAGES.register.heading).should("be.visible");
      }
    });
    cy.visit("/");
  });

  it("Scroll to Featured Posts, click a blog post, navigate to the Authors List, and view each author's detail page.", () => {
    cy.contains("h2", "Featured Post").should("be.visible").scrollIntoView();
    cy.get('a[data-id="blog_read_more"]').click();
    cy.wait("@blogDetail");
    cy.go("back");
    cy.contains("h2", "All Posts").should("be.visible").scrollIntoView();
    cy.contains("a", "View All").click();
    cy.contains("h1", "All posts").should("be.visible").scrollIntoView();
    cy.go("back");
    cy.xpath("/html/body/div/div[2]/div[2]/div[1]/div/div[2]/div[2]/div/a")
      .should("be.visible")
      .each(($el) => {
        cy.wrap($el)
          .invoke("attr", "href")
          .then((href) => {
            if (href) {
              cy.visit(href);
              cy.url().should("include", "/blog-post/");
              cy.wait("@blogDetail");
              cy.go("back");
            }
          });
      });

    cy.contains("h1", "Choose A Category")
      .should("be.visible")
      .scrollIntoView();
    cy.get('div[data-id="category_cards_div"] a')
      .should("be.visible")
      .each(($el) => {
        cy.wrap($el)
          .invoke("attr", "href")
          .then((href) => {
            if (href) {
              cy.visit(href);
              cy.url().should("include", href);
              cy.wait("@getCategoryBlogs");
              cy.contains("h2", "First Blog");
              cy.go("back");
            }
          });
      });
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
              cy.wait("@authorsDetail");
              cy.contains("h1", "My Posts").should("be.visible");
              cy.go("back");
            }
          });
      });
  });
});
