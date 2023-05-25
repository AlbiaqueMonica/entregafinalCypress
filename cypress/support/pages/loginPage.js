export class LoginPage {

    constructor() {
        this.usuarioInput = '#user';
        this.contraseñaInput = '#pass';
        this.loginButton = 'Log in';
    }

    escribirUsuario(usuario) {
        cy.get(this.usuarioInput).type(usuario);
    };

    escribirContraseña(contraseña) {
        cy.get(this.contraseñaInput).type(contraseña);
    };

    clickLogIn() {
        cy.contains(this.loginButton).click();
    };
};