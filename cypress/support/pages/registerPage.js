export class RegisterPage {
    constructor(){
        this.iniciaSesionSpan = '#registertoggle';
        this.usuarioInput = '#user';
        
    };

    clickIniciaSesion(){
        cy.get(this.iniciaSesionSpan).dblclick();
    };

    escribirUsuario(usuario){
        cy.get(this.usuarioInput).type(usuario)
    };
    
    checkGenero(genero){
        cy.get(`[value=${genero}]`).check();
    };
}