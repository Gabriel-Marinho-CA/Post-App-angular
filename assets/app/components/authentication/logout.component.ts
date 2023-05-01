import { Component } from "@angular/core";


@Component({
    selector: "app-logout",
    template: ` 
        <button
            class="btn btn-daner"
            (click)="onLogout()"
        >Logout</button>
    `
})

export class LogoutComponent {

    onLogout() {
        localStorage.clear();
        setTimeout(() => { window.location.href = "/" }, 1000)

    }

    constructor() { }
}