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

    constructor(private messageService: MessageService) {}

    onSubmit(form: NgForm) {
        const newMessage = new Message('Gab', form.value.messageContentForm);

        this.messageService.addMessage(newMessage)
            .subscribe(
                successData => console.log(successData),
                errData => console.log(errData),
            );

        form.resetForm();

    }
}