import { Component, Input, OnInit, Output } from "@angular/core";
import { Message } from '../../models/message.model';
import { MessageService } from "./message.services";
import { FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
    selector: 'app-message-card',
    templateUrl: '../../templates/message/message-card.component.html',

    styleUrls: ["../../scss/partials/cardsChat.css"]
})
export class MessageCardComponent implements OnInit {

    classesCard = ["wrap-card-msg"];

    modalOpen: boolean = false;

    formUpdateMsg: FormGroup;

    @Input() contentMessage: Message = new Message("", "");


    constructor(private messageServiceObj: MessageService) { };

    ngOnInit(): void {
        this.formUpdateMsg = new FormGroup({
            content: new FormControl('', [Validators.required])
        })
    }

    openEditModal() {
        this.modalOpen = !this.modalOpen;
    }

    onEdit() {
        const msgUpdated:Message = new Message("Gab",this.formUpdateMsg.value.content);
        
        console.log(this.contentMessage);
        this.messageServiceObj.updateMessage(msgUpdated, this.contentMessage).subscribe(
            successData => console.log(successData),
            errData => console.log(errData),
        );
    }
    onDelete() {
        this.messageServiceObj.deleteMessage(this.contentMessage).subscribe(
            successData => console.log(successData),
            errData => console.log(errData),
        );

    }

}