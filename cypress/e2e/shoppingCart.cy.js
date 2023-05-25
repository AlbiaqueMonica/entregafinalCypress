/// <reference types="cypress" />
/*
- Ingresar en la pagina de pushing IT.
- Ingresar al sistema con datos validos.
- Dirigirse al modulo "Online Shop".
- Elegir 2 productos a elección y añadirlos al carrito.
- Verificar el nombre y precio de los dos productos.
- Hacer click en "Show total price" y verificar el precio acumulado de los 2 productos
*/

import { HomePage } from "../support/pages/homePage";
import { LoginPage } from "../support/pages/loginPage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";

describe('Challenge3: Shopping cart', () =>{
    const loginPage = new LoginPage();
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();
    let data;

    before('Pre-entrega', () => {
        cy.fixture("data").then((datos) => {
            data = datos;
        });
    });

    it('Validate add two products', () =>{
        cy.visit("");
        cy.get("#registertoggle").dblclick();
        loginPage.escribirUsuario(data.user.username); 
        loginPage.escribirContraseña(data.user.password); 
        loginPage.clickLogIn(); 
        homePage.returnH2().should("exist");
        homePage.clickShoppingLink();
        productPage.addProduct(data.products.product1.name);
        productPage.addProduct(data.products.product2.name);
        productPage.shoppingClick();
        shoppingCartPage.returnName(data.products.product1.name).should('have.text', data.products.product1.name);
        shoppingCartPage.returnPrice(data.products.product1.name).should('have.text','$' + data.products.product1.price);
        shoppingCartPage.returnName(data.products.product2.name).should('have.text', data.products.product2.name);
        shoppingCartPage.returnPrice(data.products.product2.name).should('have.text','$' + data.products.product2.price);
        shoppingCartPage.totalBtnClick();
        shoppingCartPage.returnTotal().should("have.text", `${data.products.product1.price  +  data.products.product2.price}`);
    });

    after('', () => {

    }); 

    
})
