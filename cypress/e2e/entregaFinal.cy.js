/// <reference types="cypress" />

import { HomePage } from "../support/pages/homePage";
import { ProductPage } from "../support/pages/productPage";
import { ShoppingCartPage } from "../support/pages/shoppingCartPage";
import { CheckoutPage } from "../support/pages/checkoutPage";
import { ReceiptPage } from "../support/pages/receiptPage";
import { API_URL } from "../support/constants";

describe('Final Challenge', () =>{
    const homePage = new HomePage();
    const productPage = new ProductPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const receiptPage = new ReceiptPage
    let data;
    
    before('', () => {
        cy.fixture("data").then((datos) => {
            data = datos;
        });
    });

    it('Validate purchase two products', () =>{
        
        //Register user
        const bodyRequest={
            username: data.user.username,
            password: data.user.password,
            gender: data.user.gender,
            day: data.user.fechaNac.day,
            month: data.user.fechaNac.day,
            year: data.user.fechaNac.year,
            respuesta: 200
        }
        cy.request({
            url: `${API_URL}register`,
            method: 'POST',
            body: bodyRequest
        }).then(respuesta => {
            expect(respuesta.status).to.be.equal(200);
        })

        //Login
        cy.request({
            url: `${API_URL}login`,
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
            url: `${API_URL}deleteuser/${data.user.username}`,
            method: 'DELETE',
            respuesta: 200
        }).then(respuesta=>{
            expect(respuesta.status).to.be.equal(200);
        })
    }) 
})
