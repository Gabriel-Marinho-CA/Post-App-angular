import { Component } from "@angular/core";
import { MessageService } from "./message.services";
import { Message } from "../../models/message.model";
import { NgForm } from "@angular/forms";



@Component({
    selector: "app-message-input",
    templateUrl: '../../templates/message/message-input.component.html',
    styleUrls: ["../../scss/style.css"]
})

export class MessageInputComponent {

    constructor(private messageService: MessageService) { }

    onSubmit(form: NgForm) {

        const userDataLogged = localStorage.getItem('User Logged');
        
        // const userName = userDataLogged.split(',')[0];

        const userLoggedId = userDataLogged.split(',')[1];

        const newMessage = new Message("", form.value.messageContentForm, null, userLoggedId);

        this.messageService.addMessage(newMessage)
            .subscribe(
                successData => console.log(successData),
                errData => console.log(errData),
            );

        form.resetForm();

    }
}