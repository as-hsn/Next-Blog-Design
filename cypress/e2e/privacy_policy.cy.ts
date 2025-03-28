describe("check privacy policy page properly loads", () => {
  it("checks privacy policy page", () => {
    cy.visit("our-policy");
    cy.url().should("include", "/our-policy");
    cy.get("nav").should("be.visible");
    cy.get("footer").should("be.visible");
    cy.contains("h1", "Privacy Policy").should("be.visible");
    cy.contains("p", "Last Updated on 27th January 2022").should("be.visible");
    cy.get("h3").should("be.visible");
  });
});
