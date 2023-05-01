import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NewsletterComponent } from './components/common/newsletter.components';

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
        LogoutComponent,
        NewsletterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        myrouting,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}