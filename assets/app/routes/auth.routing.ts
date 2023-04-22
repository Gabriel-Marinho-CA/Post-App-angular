import { Routes } from '@angular/router';
import { SigninComponent } from '../components/authentication/signin.component';
import { SignupComponent } from '../components/authentication/signup.component';
import { LogoutComponent } from '../components/authentication/logout.component';



export const AUTH_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'sigup',
        pathMatch: 'full'
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'logout',
        component: LogoutComponent
    },
]