import data from "../fixtures/index.json";

const LOGIN_DETAILS = [
  {
    type: "invalid",
    email: "testwrong@gmail.com",
    password: "testwrong",
  },
  {
    type: "valid",
    email: "testuser@gmail.com",
    password: "testuser",
  },
];
const PASSWORD_RESET_DETAILS = [
  {
    type: "invalid",
    email: "testwrong@gmail.com",
  },
  {
    type: "valid",
    email: "testuser@gmail.com",
  },
];
const OTP_DETAILS = [
  {
    type: "invalid",
    otp: "123456",
    password: "testuser",
  },
  {
    type: "valid",
    otp: "98000",
    password: "testuser",
  },
];
const LOGIN_TOAST_MESSAGES = {
  invalid: "Invalid email or password",
  success: "You are now logged In",
};
const PASSWORD_TOAST_MESSAGES = {
  invalid: "Your email is not registered. Please register first.",
  success: "Reset link sent! Check your email.",
};
const OTP_TOAST_MESSAGES = {
  invalid: "Invalid or expired OTP",
  success: "Password updated successfully!",
};

describe("User Login", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/auth/login", {
      ...data.loginResponse.invalidUser,
      delay: 500,
    }).as("invalidUserAPI");

    cy.intercept("POST", "**/api/auth/login", (req) => {
      if (
        req.body.email === LOGIN_DETAILS[1].email &&
        req.body.password === LOGIN_DETAILS[1].password
      ) {
        req.reply({
          ...data.loginResponse.validUser,
          delay: 500,
        });
      }
    }).as("validUserAPI");

    cy.intercept("POST", "**/api/auth/password-reset", {
      ...data.resetPassword.invalidUser,
      delay: 500,
    }).as("invalidUserPasswordAPI");

    cy.intercept("POST", "**/api/auth/password-reset", (req) => {
      if (req.body.email === PASSWORD_RESET_DETAILS[1].email) {
        req.reply({
          ...data.resetPassword.validUser,
          delay: 500,
        });
      }
    }).as("validUserPasswordAPI");

    cy.intercept("POST", "**/api/auth/reset-password", {
      ...data.resetPassword.invalidOtp,
      delay: 500,
    }).as("invalidOtp");

    cy.intercept("POST", "**/api/auth/reset-password", (req) => {
      if (req.body.otp === OTP_DETAILS[1].otp) {
        req.reply({
          ...data.resetPassword.validOtp,
          delay: 500,
        });
      }
    }).as("validOtp");

    cy.visit("/login");
    cy.url().should("include", "/login");
    cy.get("h1").should("be.visible").and("contain.text", "Login");
  });

  it("checks validation on login form", { scrollBehavior: "center" }, () => {
    // Check login button display and contain login text
    cy.get('button[type="submit"]')
      .should("be.visible")
      .and("contain.text", "Login");
    // Check email and password input fields display
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('button[type="submit"]').click();
    cy.contains("div", "Email is required").should("be.visible");
    cy.contains("div", "Password is required").should("be.visible");
    cy.get('input[name="email"]').type("invalidemail123");
    cy.get('input[name="password"]').type("pass");
    cy.get('button[type="submit"]').click();
    cy.contains("div", "Invalid email").should("be.visible");
    cy.contains("div", "Password is required").should("not.exist");
    cy.get('input[name="email"]').type("@");
    cy.get('button[type="submit"]').click();
    cy.contains("div", "Invalid email").should("be.visible");
    cy.get('input[name="email"]').type("g");
    cy.contains("div", "Invalid email").should("not.exist");
    cy.contains("div", "Password is required").should("not.exist");
    cy.contains("a", "Register").click();
    cy.url().should("include", "/register");
    cy.contains("a", "Login").click();
    cy.url().should("include", "/login");
  });

  it(
    "First, enter incorrect details, then correct them and log in.",
    { scrollBehavior: "center" },
    () => {
      // Check login button display and contain login text
      cy.get('button[type="submit"]')
        .should("be.visible")
        .and("contain.text", "Login");

      LOGIN_DETAILS.map((data, index) => {
        cy.get('input[name="email"]').type(LOGIN_DETAILS[index].email);
        cy.get('input[name="password"]').type(LOGIN_DETAILS[index].password);

        // Click login and verify loader appears
        cy.get('button[type="submit"]').click();
        cy.get(".loader").should("be.visible");
        if (data.type === "valid") {
          cy.wait("@validUserAPI");
        } else {
          cy.wait("@invalidUserAPI");
        }

        // Ensure the loader disappears after request completion
        cy.get(".loader").should("not.exist");

        if (data.type === "invalid") {
          // Verify error message is displayed
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", LOGIN_TOAST_MESSAGES.invalid);
          cy.get('input[name="email"]').clear();
          cy.get('input[name="password"]').clear();
        } else {
          // Verify logged in message is displayed
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", LOGIN_TOAST_MESSAGES.success);

          // Set and verify authentication token
          cy.setCookie("accessToken", "mock-access-token");
          cy.getCookie("accessToken").should(
            "have.property",
            "value",
            "mock-access-token"
          );
          cy.visit("/"); // Redirected home page
          cy.url().should("not.include", "/login");
        }
      });
    }
  );

  it(
    "Check forgot password page check validation and verify otp functionality",
    { scrollBehavior: "center" },
    () => {
      // Visit forgot password page
      cy.contains("a", "Forgot password?").click();
      cy.url().should("include", "/password-reset");
      cy.contains("h2", "Request Password Reset").should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
      // Check Validation
      cy.get('button[type="submit"]').click();
      cy.contains("div", "Email is required").should("be.visible");
      cy.get('input[name="email"]').type("invalidemail123");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "Invalid email").should("be.visible");
      cy.get('input[name="email"]').type("@");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "Invalid email").should("be.visible");
      cy.get('input[name="email"]').type("g");
      cy.contains("div", "Invalid email").should("not.exist");
      cy.get('input[name="email"]').clear();
      cy.contains("div", "Email is required").should("be.visible");

      PASSWORD_RESET_DETAILS.map((data, index) => {
        cy.get('input[name="email"]').type(PASSWORD_RESET_DETAILS[index].email);
        // Click login and verify loader appears
        cy.get('button[type="submit"]').click();
        cy.get(".loader").should("be.visible");
        if (data.type === "valid") {
          cy.wait("@validUserPasswordAPI");
        } else {
          cy.wait("@invalidUserPasswordAPI");
        }

        // Ensure the loader disappears after request completion
        cy.get(".loader").should("not.exist");

        if (data.type === "invalid") {
          // Verify error message is displayed
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", PASSWORD_TOAST_MESSAGES.invalid);
          cy.get('input[name="email"]').clear();
        } else {
          // Verify logged in message is displayed
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", PASSWORD_TOAST_MESSAGES.success);
        }
      });
      // Redirected enter new password and otp page
      cy.visit(`/reset-password?email=${PASSWORD_RESET_DETAILS[1].email}`);
      cy.url().should(
        "include",
        `/reset-password?email=${PASSWORD_RESET_DETAILS[1].email}`
      );
      cy.contains("h2", "Enter New Password").should("be.visible");
      cy.get('input[name="otp"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('button[type="submit"]').should("be.visible");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "Password is required").should("be.visible");
      cy.contains("div", "OTP is required").should("be.visible");

      OTP_DETAILS.map((data, index) => {
        cy.get('input[name="otp"]').type(OTP_DETAILS[index].otp);
        cy.get('input[name="password"]').type(OTP_DETAILS[index].password);
        // Click login and verify loader appears
        cy.get('button[type="submit"]').click();
        cy.get(".loader").should("be.visible");
        if (data.type === "valid") {
          cy.wait("@validOtp");
        } else {
          cy.wait("@invalidOtp");
        }

        // Ensure the loader disappears after request completion
        cy.get(".loader").should("not.exist");

        if (data.type === "invalid") {
          // Verify error message is displayed
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", OTP_TOAST_MESSAGES.invalid);
          cy.get('input[name="otp"]').clear();
        } else {
          // Verify logged in message is displayed
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", OTP_TOAST_MESSAGES.success);
        }
      });
      cy.wait(2000);
      cy.url().should("include", "/login");
    }
  );
});
