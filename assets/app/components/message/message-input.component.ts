import { Component } from "@angular/core";
import { MessageService } from "./message.services";
import { Message } from "../../models/message.model";



@Component({
    selector: "app-message-input",
    templateUrl: '../../templates/message-input.component.html',
    // providers: [MessageService],
    styleUrls: ["../../scss/style.css"]
})

export class MessageInputComponent {

    constructor(private messageService: MessageService) {

    }

    onSave(text: string) {

        const messageAux = new Message('Gab', text);
        this.messageService.addMessage(messageAux);

    }
}