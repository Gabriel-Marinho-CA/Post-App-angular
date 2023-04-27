import { Component, Input, Output } from "@angular/core";
import { Message } from '../../models/message.model';
import { EventEmitter } from '@angular/core';
import { MessageService } from "./message.services";


@Component({
    selector: 'app-message-card',
    templateUrl: '../../templates/message/message-card.component.html',

    styleUrls: ["../../scss/partials/cardsChat.css"]
})
export class MessageCardComponent {

    classesCard = ["wrap-card-msg"];

    @Input() contentMessage: Message = new Message("", "");
    constructor(private messageServiceObj: MessageService) {};

    

    onEdit() {

    }
    onDelete() {
        this.messageServiceObj.deleteMessage(this.contentMessage);
    }
  
}