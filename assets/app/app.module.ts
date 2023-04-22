import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { MessageComponent } from './components/message/message.component';
import { MessageInputComponent } from './components/message/message-input.component';
import { MessageListComponent } from './components/message/message-list.component';
import { AuthComponent } from './components/authentication/auth.component';
import { HeaderComponent } from './components/common/header.component';
import { myrouting } from './routes/app.routing';
import { MessageCardComponent } from './components/message/message-card.component';
import { LogoutComponent } from './components/authentication/logout.component';
import { SigninComponent } from './components/authentication/signin.component';
import { SignupComponent } from './components/authentication/signup.component';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageInputComponent,
        MessageListComponent,
        AuthComponent,
        HeaderComponent,
        MessageCardComponent,
        SigninComponent,
        SignupComponent,
        LogoutComponent
    ],
    imports: [BrowserModule, FormsModule, myrouting],
    bootstrap: [AppComponent]
})
export class AppModule {

}