export class HomePage {
    constructor() {
        this.shoppingLink = 'Online Shop';
    };

    clickShoppingLink() {
        cy.contains(this.shoppingLink).click();
    };

    returnH2(){
        return cy.xpath(`//h2[starts-with(@id,'user_pushingit')]`);
    }
};