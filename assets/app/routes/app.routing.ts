import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "../app.component";
import { AuthComponent } from "../components/authentication/auth.component";
import { MessageComponent } from "../components/message/message.component";
import { AUTH_ROUTES } from "./auth.routing";


const APP_ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/mensagens',
        pathMatch:'full'
    }, 
    {
        path: 'mensagens',
        component: MessageComponent
    }, 
    {
        path: 'autenticacao',
        component: AuthComponent,
        children: AUTH_ROUTES
    }, 
];

export const myrouting = RouterModule.forRoot(APP_ROUTES)