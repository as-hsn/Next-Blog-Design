import data from "../fixtures/index.json";

const TEXTS = {
  heading: "Sign Up",
  pendingOtp: "An OTP has been sent to your email",
  invalidOtp: "Invalid OTP",
  successLogin: "You are now logged in",
};

const REGISTER_DETAILS = [
  {
    name: "test",
    email: "testwrong@gmail.com",
    password: "testwrong",
    confirm_password: "testwrong",
  },
];

const OTP_DETAILS = [
  { type: "invalid_otp", valid_otp: 123455 },
  { type: "valid_otp", valid_otp: 98000 },
];

describe("User Registration", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/api/auth/signup", {
      ...data.registrationResponse.pendingRegistration,
      delay: 500,
    }).as("requestOtpAPI");

    cy.intercept("POST", "**/api/auth/signup", (req) => {
      if (req.body.otp) {
        req.reply({
          ...data.registrationResponse.invalidOtp,
          delay: 500,
        });
      }
    }).as("invalidOtpAPI");

    cy.intercept("POST", "**/api/auth/signup", (req) => {
      if (req.body.otp === "98000") {
        req.reply({
          ...data.registrationResponse.validOtp,
          delay: 500,
        });
      }
    }).as("validOtpAPI");

    cy.visit("/register");
    cy.url().should("include", "/register");
    cy.get("h1").should("be.visible").and("contain.text", "Sign Up");
  });

  it(
    "checks validation on registration form",
    { scrollBehavior: "center" },
    () => {
      cy.get('button[type="submit"]')
        .should("be.visible")
        .and("contain.text", "Sign Up");
      cy.get('input[name="name"]').should("be.visible");
      cy.get('input[name="email"]').should("be.visible");
      cy.get('input[name="password"]').should("be.visible");
      cy.get('input[name="confirm_password"]').should("be.visible");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "Name is required").should("be.visible");
      cy.contains("div", "Email is required").should("be.visible");
      cy.contains("div", "Password is required").should("be.visible");
      cy.contains("div", "Confirm Password is required").should("be.visible");
      cy.get('input[name="name"]').type("te");
      cy.get('input[name="email"]').type("invalidemail123");
      cy.get('input[name="password"]').type("pass");
      cy.get('input[name="confirm_password"]').type("pass");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "Invalid email").should("be.visible");
      cy.contains("div", "Name must contain 3 characters!").should(
        "be.visible"
      );
      cy.contains("div", "Password must be at least 8 characters").should(
        "be.visible"
      );
      cy.get('input[name="email"]').type("@");
      cy.contains("div", "Invalid email").should("be.visible");
      cy.get('input[name="name"]').type("st");
      cy.get('button[type="submit"]').click();
      cy.get('input[name="email"]').type("gmail.com");
      cy.contains("div", "Invalid email").should("not.exist");
      cy.contains("div", "Name must contain 3 characters!").should("not.exist");
      cy.get('input[name="password"]').type("pass");
      cy.get('input[name="confirm_password"]').type("pas");
      cy.contains("div", "Passwords must match").should("be.visible");
      cy.get('button[type="submit"]').click();
      cy.contains("div", "Passwords must match").should("be.visible");
      cy.get('input[name="confirm_password"]').type("s");
      cy.contains("div", "Passwords must match").should("not.exist");
      cy.get('button[type="submit"]').click();
      cy.get(".loader").should("be.visible");
      cy.wait("@requestOtpAPI");
      cy.get(".loader").should("not.exist");
      cy.get(".custom-toast")
        .should("be.visible")
        .and("contain.text", TEXTS.pendingOtp);
      cy.get("input[name='otp']").should("be.visible");
      cy.contains("a", "Login").click();
      cy.url().should("include", "/login");
      cy.contains("h1", "Login").should("be.visible");
      cy.get("input[name='email']").should("be.visible");
      cy.get("input[name='password']").should("be.visible");
      cy.contains("a", "Register").click();
      cy.url().should("include", "/register");
    }
  );

  it(
    "First insert incorrect otp and then correct otp",
    { scrollBehavior: "center" },
    () => {
      // Check login button display and contain SignUp text
      cy.get('button[type="submit"]')
        .should("be.visible")
        .and("contain.text", TEXTS.heading);

      // Use custom command to fill the registration form
      cy.get('input[name="name"]').type(REGISTER_DETAILS[0].name);
      cy.get('input[name="email"]').type(REGISTER_DETAILS[0].email);
      cy.get('input[name="password"]').type(REGISTER_DETAILS[0].password);
      cy.get('input[name="confirm_password"]').type(
        REGISTER_DETAILS[0].confirm_password
      );

      // Submit registration form
      cy.get("button[type='submit']").click();
      cy.get(".loader").should("be.visible");
      cy.wait("@requestOtpAPI");
      cy.get(".loader").should("not.exist");

      // Check sending OTP message is visible
      cy.get(".custom-toast")
        .should("be.visible")
        .and("contain.text", TEXTS.pendingOtp);

      OTP_DETAILS.map((otp) => {
        // Ensure OTP input appears and type valid otp
        cy.get("input[name='otp']").should("be.visible");
        if (otp.type === "valid_otp") {
          cy.get('input[name="otp"]').type("98000");
        } else {
          cy.get('input[name="otp"]').type("00000");
        }
        // Submit correct OTP verification
        cy.get('button[type="submit"]').click();
        cy.get(".loader").should("be.visible");
        cy.wait("@validOtpAPI");
        cy.get(".loader").should("not.exist");

        if (otp.type === "valid_otp") {
          // Check success login message is visible
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", TEXTS.successLogin);

          // Set and verify authentication token
          cy.setCookie("accessToken", "mock-access-token");
          cy.getCookie("accessToken").should(
            "have.property",
            "value",
            "mock-access-token"
          );

          // Navigate to home page
          cy.visit("/");
          cy.url().should("not.include", "/register");
        } else {
          cy.get(".custom-toast")
            .should("be.visible")
            .and("contain.text", TEXTS.invalidOtp);
          cy.get('input[name="otp"]').clear();
        }
      });
    }
  );
});
