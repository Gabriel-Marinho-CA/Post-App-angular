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

        const userIdIndex = userDataLogged.indexOf(',');

        const userName = userDataLogged.substring(-userDataLogged.length, userIdIndex);
        const userId = userDataLogged.substring(userDataLogged.length, userIdIndex + 1);

        const newMessage = new Message(userName, form.value.messageContentForm);

        this.messageService.addMessage(newMessage)
            .subscribe(
                successData => console.log(successData),
                errData => console.log(errData),
            );

        form.resetForm();

    }
}