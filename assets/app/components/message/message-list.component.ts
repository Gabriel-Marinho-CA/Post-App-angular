import { Component, OnInit } from "@angular/core";
import { Message } from "../../models/message.model";
import { MessageService } from "./message.services";


@Component({
    selector: "app-message-list",
    templateUrl: '../../templates/message/message-list.component.html',
})

export class MessageListComponent implements OnInit {

    messageS: Message[] = [];

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {

        this.messageService.getMessages()
            .subscribe(
                (successData: any) => {
                    this.messageS = successData;
                },
                errData => console.log(errData)
            )
    }

}