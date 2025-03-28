import data from "../fixtures/index.json";

describe("Check profile page", () => {
  beforeEach(() => {
    // Intercept API request for user profile
    cy.intercept("GET", "**/api/auth/user", {
      success: true,
      user: data.userProfileData,
    }).as("getUserProfile");

    // Intercept API request for update user profile
    cy.intercept("PUT", "**/api/auth/update-user", (req) =>
      req.reply({
        delay: 500,
        body: {
          success: true,
          user: data.userProfileData,
        },
      })
    ).as("updateUserProfile");

    cy.setCookie("accessToken", "mock-access-token");
    cy.getCookie("accessToken").should(
      "have.property",
      "value",
      "mock-access-token"
    );
    // Visit the user profile page and verify information
    cy.visit("/profile");
    cy.url().should("include", "/profile");
  });

  it("Checks if user profile data loads properly", () => {
    // Set token to enter profile page
    cy.contains("p", "CONTACT INFORMATION");
    cy.contains("p", "BASIC INFORMATION");
    cy.wait("@getUserProfile");
    cy.contains("button", "Edit").should("be.visible").click();
    cy.contains("button", "Edit").should("not.exist");
    cy.contains("button", "Save").should("be.visible");
    cy.contains("button", "Cancel").should("be.visible").click();
    cy.contains("button", "Edit").should("be.visible").click();
    cy.contains("button", "Edit").should("not.exist");

    // Update user details
    cy.get("input[name=name]")
      .should("be.visible")
      .clear()
      .type("Updated name");
    cy.get("input[name=phone]").should("be.visible").clear().type("0333233232");
    cy.get('select[name="Gender"]').select("Male");
    cy.get('input[name="Birthdate"]').type("2004-02-12");
    cy.contains("button", "Save").should("be.visible").click();
    cy.get(".loader").should("be.visible");
    cy.contains("button", "Save Changes").should("be.visible");
    cy.contains("button", "Save").should("not.exist");
    cy.contains("button", "Cancel").should("not.exist");

    cy.wait("@updateUserProfile");
    cy.contains("button", "Save Changes").should("not.exist");
    cy.get(".loader").should("not.exist");
    cy.get(".custom-toast")
      .should("be.visible")
      .and("contain.text", "Profile Updated...");
  });
});
