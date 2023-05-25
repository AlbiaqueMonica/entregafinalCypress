export class ProductPage{

    constructor() {
        this.shoppingButton = '#goShoppingCart';
        this.modal = '#closeModal';
    }

    addProduct(product) {
            cy.get(`[value="${product}"]`).click();
            cy.get(this.modal).click();
    };

    shoppingClick() {
        cy.get(this.shoppingButton).click();
    };
    
};