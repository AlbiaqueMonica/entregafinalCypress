export class ShoppingCartPage{
    returnName(product){
        return cy.get(`[name="${product}"]`);
    };

    totalBtnClick(){
        cy.xpath(`//button[text()="Show total price"]`).click();
    }

    returnPrice(product){
        return  cy.contains(product).siblings('[name]');
    };

    returnTotal(){
        return cy.xpath(`//p[@id='price']`);
    }

    clickCheckout(){
        cy.contains("Go to Checkout").click();
    }
}