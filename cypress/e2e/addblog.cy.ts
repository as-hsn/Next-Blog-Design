import "cypress-file-upload";
import data from "../fixtures/index.json";

describe("get update add and delete blogs", () => {
  beforeEach(() => {
    let currentBlogs = [...data.addBlog.getBlogData];

    cy.intercept("GET", "**/api/auth/get-blogs", (req) => {
      req.reply({
        success: true,
        blogs: currentBlogs,
      });
    }).as("getBlogs");

    cy.intercept("DELETE", "**/api/auth/delete-blog?blogId=*", (req) => {
      const url = new URL(req.url);
      const blogId = url.searchParams.get("blogId");
      currentBlogs = currentBlogs.filter((blog) => blog.id !== Number(blogId));
      req.reply({
        success: true,
      });
    }).as("deleteBlog");

    cy.intercept("PUT", "**/api/auth/update-blog", (req) => {
      req.reply({
        delay: 500,
        body: {
          success: true,
        },
      });
    }).as("updateblog");

    cy.intercept("POST", "**/api/auth/add-blog", (req) => {
      const newBlog = {
        id: currentBlogs.length + 1,
        title: `${currentBlogs.length + 1}) title is here`,
        body: `${currentBlogs.length + 1}) title body is here`,
        blogImgUrl:
          "https://images.pexels.com/photos/25916115/pexels-photo-25916115/free-photo-of-close-up-of-a-small-cardboard-figurine-standing-next-to-a-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      };
      currentBlogs.push(newBlog);
      req.reply({
        delay: 500,
        body: {
          success: true,
        },
      });
    }).as("addBlog");

    cy.setCookie("accessToken", "mock-access-token");
    cy.getCookie("accessToken").should(
      "have.property",
      "value",
      "mock-access-token"
    );
    cy.visit("/add-blog");
    cy.url().should("include", "/add-blog");
  });

  it("check validation and add blog", () => {
    cy.contains("h2", "Add Blog");
    cy.contains("h2", "Your Blogs");
    cy.get("input[name=blogTitle]").should("be.visible");
    cy.get("select[name=blogCategory]").should("be.visible");
    cy.get("input[type=file]").should("be.visible");
    cy.get("textarea[name=blogBody]").should("be.visible");
    cy.get("button[type=submit]")
      .contains("Publish Blog")
      .should("be.visible")
      .click();
    cy.contains("div", "Blog title is required").should("be.visible");
    cy.contains("div", "Blog image is required").should("be.visible");
    cy.contains("div", "Blog content is required").should("be.visible");
    cy.get("input[name=blogTitle]").type("New Blog Title");
    cy.contains("div", "Blog title is required").should("not.exist");
    cy.get("select[name=blogCategory]")
      .should("be.visible")
      .select("Technology");
    cy.get("input[type=file]").should("be.visible").attachFile("ball-1.png");
    cy.contains("div", "Blog image is required").should("not.exist");
    cy.get("textarea[name=blogBody]")
      .should("be.visible")
      .type(
        "Compromise for your Dream but NEVER Compromise on your Dream. ― Imran Khan"
      );
    cy.contains("div", "Blog image is required").should("not.exist");
    cy.get("button[type=submit]").click();
    cy.get(".loader").should("be.visible");
    cy.wait("@addBlog");
    cy.get(".loader").should("not.exist");
    cy.get("input[name=blogTitle]").should("have.value", "");
    cy.get("textarea[name=blogBody]").should("have.value", "");
  });

  it("Update and delete is blogs", () => {
    cy.get('div[data-id="author_blogs_div"]')
      .find("div.flex.items-center.justify-between")
      .first()
      .find("button")
      .contains("Update")
      .click();
    cy.get("input[name=blogTitle]")
      .should("be.visible")
      .clear()
      .type("Updated blog title");
    cy.get("select[name=blogCategory]")
      .should("be.visible")
      .select("Technology");
    cy.get("textarea[name=blogBody]")
      .should("be.visible")
      .type("updated blog body ");
    cy.contains('button[type="submit"]', "Update Blog").click();
    cy.get(".loader").should("be.visible");
    cy.wait("@updateblog");
    cy.get(".loader").should("not.exist");
    cy.get('div[data-id="author_blogs_div"]')
      .first()
      .find("div.flex.items-center.justify-between")
      .each(($el) => {
        cy.wrap($el).find("button").contains("Delete").click();
        cy.wait("@deleteBlog");
      });
    cy.contains("p", "You have not added any blog").should("be.visible");
  });
});
