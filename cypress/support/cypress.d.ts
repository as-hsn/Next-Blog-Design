// Import Cypress types
/// <reference types="cypress" />

// Extend the Cypress Chainable interface
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to fill the registration form.
     * @param name - The user's name
     * @param email - The user's email
     * @param password - The user's password
     * @param confirmPassword - The user's confirmation password
     */
    fillRegistrationForm(
      name: string,
      email: string,
      password: string,
      confirmPassword: string
    ): Chainable<void>;

    /**
     * Custom command to submit the OTP form.
     * @param otp - The OTP to submit
     */
    submitOtp(otp: string): Chainable<void>;

    // Custom command to fill the login form
    fillLoginForm(email: string, password: string): Chainable<void>;

    checkLoader(shouldBeVisible: boolean): Chainable<void>;
  }
}
