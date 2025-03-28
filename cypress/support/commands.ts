Cypress.Commands.add("fillRegistrationForm", (name, email, password, confirmPassword) => {
  cy.get('input[name="name"]').type(name);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('input[name="confirm_password"]').type(confirmPassword);
});

Cypress.Commands.add("submitOtp", (otp) => {
  cy.get('input[name="otp"]').type(otp);
  cy.get('button[type="submit"]').click();
});


Cypress.Commands.add("fillLoginForm", (
  email,password
) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
})

Cypress.Commands.add("checkLoader", (shouldBeVisible = true) => {
  const assertion = shouldBeVisible ? "be.visible" : "not.exist";
  cy.get(".loader").should(assertion);
});
