export class CheckoutPage{
    constructor(){
        this.firstNameInput = '#FirstName';
        this.lastNameInput = '#lastName';
        this.cardNumberInput = '#cardNumber';
    };

    typeName(nombre){
        cy.get(this.firstNameInput).type(nombre)
    };

    typeLastName(apellido){
        cy.get(this.lastNameInput).type(apellido)
    };

    typeCard(number){
        cy.get(this.cardNumberInput).type(number)
    };

    clickPurchase(){
        cy.contains("Purchase").click();
    }

}