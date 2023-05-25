const TIMEOUT = 10000;

export class ReceiptPage{
    constructor(){
        this.data = '.chakra-modal__body.css-1tcqc9o';
        this.tk = '[role="dialog"]';
        this.headerTk = '.chakra-modal__header.css-xdpall';
    };
   
    getTk(){
        return cy.get(this.tk,{ timeout: TIMEOUT } );
    }

    getData(){
        return cy.get(this.data, { timeout: TIMEOUT })
    }

    getHeaderTk(){
        return cy.get(this.headerTk, { timeout: TIMEOUT }).eq(1)
    }
    

}