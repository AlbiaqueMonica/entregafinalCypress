/// <reference types="cypress" />
/*
- Deberán utilizar el mismo proyecto que utilizaron para la pre-entrega.
- Deberá contar con una baseURL
- Deberá poder iniciarse colocando "npm test"
- Deberán utilizar fixtures (2)
- Deberán utilizar hooks (Before y after)
- Deberán utilizar una clase diferente para cada pagina que utilicen
- Deberán entregarlo en un repositorio de GitHub.
- El login y el registro debe ser utilizando endpoints (cy.request)
- Deberán eliminar el usuario creado una vez finalizado el test
*/

import { HomePage } from "../support/pages/homePage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { ReceiptPage } from "../support/pages/receiptPage";

describe('Final Challenge', () =>{
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const receiptPage = new ReceiptPage
    let data;
    const numero = Math.floor(Math.random() * 1000);
    let user; 
    
    before('', () => {
        cy.fixture("data").then((datos) => {
            data = datos;
            user = data.user.username + numero
        });
    });

    

    it('Validate add two products', () =>{
        
        //Register user
        const bodyRequest={
            username: user,
            password: data.user.password,
            gender:'Female',
            day:'18',
            month:'August',
            year: '1985',
            respuesta: 200
        }
        cy.request({
            url: data.api.register,
            method: 'POST',
            body: bodyRequest
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200);
        })
        //Login
        cy.request({
            url: "https://pushing-it.onrender.com/api/login",
            method: 'POST',
            body:{
                username: bodyRequest.username,
                password: bodyRequest.password            
            }
            }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200);
            window.localStorage.setItem('token', respuesta.body.token);
            window.localStorage.setItem('user', respuesta.body.user.username);
        });
        cy.visit("");
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

        //Checkout
        shoppingCartPage.clickCheckout();
        checkoutPage.typeName(data.checkout.name);
        checkoutPage.typeLastName(data.checkout.lastName);
        checkoutPage.typeCard(data.checkout.cardNumber);
        checkoutPage.clickPurchase();

        //Validar tk
        receiptPage.getTk().should('exist').then(tk =>{
            receiptPage.getHeaderTk().should('have.text', 'Purchase has been completed successfully')    
            receiptPage.getData().should(($p) => {
                expect($p).to.contain(data.checkout.name)
                .and.to.contain(data.checkout.lastName)
                .and.to.contain(data.products.product1.name)
                .and.to.contain(data.products.product2.name)
                .and.to.contain(data.checkout.cardNumber)
                .and.to.contain(`${data.products.product1.price  +  data.products.product2.price}`)
                })
        })
        

    });

    after('', () => {
        //eliminar usuario
        cy.request({
            url: data.api.delete + user,
            method: 'DELETE',
            respuesta: 200
        }).then(respuesta=>{
            expect(respuesta.status).to.be.equal(200);
        })
    }) 
})
