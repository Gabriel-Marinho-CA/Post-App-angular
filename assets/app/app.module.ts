import { NgModule } from '@angular/core'; 
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { MessageComponent } from './components/message/message.component';
import { MessageInputComponent } from './components/message/message-input.component';
import { MessageListComponent } from './components/message/message-list.component';

@NgModule({
    declarations: [
        AppComponent,
        MessageComponent,
        MessageInputComponent,
        MessageListComponent
    ],
    imports: [BrowserModule, FormsModule],
    bootstrap: [AppComponent]
})
export class AppModule {

}