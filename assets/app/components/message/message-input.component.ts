import { Component } from "@angular/core";
import { MessageService } from "./message.services";
import { Message } from "../../models/message.model";
import { NgForm } from "@angular/forms";



@Component({
    selector: "app-message-input",
    templateUrl: '../../templates/message/message-input.component.html',
    // providers: [MessageService],
    styleUrls: ["../../scss/style.css"]
})

export class MessageInputComponent {

    constructor(private messageService: MessageService) {

    }

    // onSave(text: string) {
    //     const messageAux = new Message('Gab', text);
    //     this.messageService.addMessage(messageAux);
    // }

    onSubmit(form: NgForm) {
        const msgAux = new Message('Gab', form.value.messageContentForm);

        console.log(msgAux);

        this.messageService.addMessage(msgAux)
            .subscribe(
                successData => console.log(successData),
                errData => console.log(errData),
            );

        form.resetForm();

    }


}