import { Component } from "@angular/core";


@Component({
    selector: "app-logout",
    styleUrls: ["../../scss/style.css"],
    template: ` 
        <h3>Clique para sair da sua conta</h3>
        <button
            class="btn btn-danger"
            (click)="onLogout()"
        >Sair</button>
    `
})

export class LogoutComponent {

    onLogout() {
        localStorage.clear();
        setTimeout(() => { window.location.href = "/" }, 1000)

    }

    constructor() { }
}