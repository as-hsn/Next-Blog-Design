import data from "../fixtures/index.json";

const SUCCESS_MESSAGE =
  "Thank you! Your message has been received, and we'll respond shortly";
const EMAIL_ERROR_MESSAGE = "Invalid email address";

describe("Contact Page", () => {
  beforeEach(() => {
    // Intercept API request for contact form
    cy.intercept("POST", "**/api/contact-form", {
      delay: 500,
      statusCode: 200,
      body: data.contactFormResponse,
    }).as("contact-form");

    cy.visit("/contact");
    cy.url().should("include", "/contact");
    cy.contains("p", "CONTACT US").should("be.visible");
  });

  it(
    "should fill out and submit the contact form successfully",
    { scrollBehavior: "center" },
    () => {
      // Fill all the fields in the form
      cy.get('input[name="name"]').type("Test User");
      cy.get('input[name="email"]').type("testuser@hotmail.com");
      cy.get('select[name="issue"]').select("Report a Problem");
      cy.get('textarea[name="message"]').type(
        "This is a test message injected by cypress."
      );

      // Submit the form and check for loader and success message
      cy.get('button[type="submit"]').click();
      cy.get(".loader").should("be.visible");
      cy.wait("@contact-form");
      cy.get(".loader").should("not.exist");

      cy.get(".custom-toast")
        .should("be.visible")
        .and("contain.text", SUCCESS_MESSAGE);
    }
  );

  it(
    "should display validation error for invalid email format",
    { scrollBehavior: "center" },
    () => {
      // Click submit without filling in any fields
      cy.get('button[type="submit"]').click();

      cy.visit("/contact");
      cy.url().should("include", "/contact");

      cy.contains("p", "CONTACT US").should("be.visible");
      // Fill out the form with invalid email
      cy.get('input[name="name"]').type("Te");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "name must be at least 3 characters").should(
        "be.visible"
      );
      cy.get(".loader").should("not.exist");
      cy.get('input[name="name"]').type("st User");
      cy.contains("div", "name must be at least 3 characters").should(
        "not.exist"
      );
      cy.get('button[type="submit"]').click();
      cy.get(".loader").should("not.exist");
      cy.get('input[name="email"]').type("invalidemail@");
      cy.get('button[type="submit"]').click();
      cy.contains("div", EMAIL_ERROR_MESSAGE).should("be.visible");
      cy.get('input[name="email"]').type("gmail.com");
      cy.contains("div", EMAIL_ERROR_MESSAGE).should("not.exist");
      cy.get(".loader").should("not.exist");
      cy.get('select[name="issue"]').select("Report a Problem");
      cy.get('button[type="submit"]').click();
      cy.get(".loader").should("not.exist");
      cy.get('textarea[name="message"]').type("This is a");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "message must be at least 20 characters").should(
        "be.visible"
      );
      cy.get('textarea[name="message"]').type(
        " test message injected by cypress."
      );
      cy.get('button[type="submit"]').click();
      cy.get(".loader").should("be.visible");
      cy.wait("@contact-form");
      cy.get(".loader").should("not.exist");
      cy.get(".custom-toast")
        .should("be.visible")
        .and("contain.text", SUCCESS_MESSAGE);
    }
  );
});
