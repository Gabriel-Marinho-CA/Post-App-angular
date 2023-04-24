import { Component, OnInit } from "@angular/core";
import { Message } from "../../models/message.model";
import { MessageService } from "./message.services";


@Component({
    selector: "app-message-list",
    templateUrl: '../../templates/message/message-list.component.html',
    // providers: [MessageService]
})

export class MessageListComponent implements OnInit {

    messageS: Message[] = [
        new Message("t1", "gabs"),
        new Message("t2", "gabs"),
        new Message("t3", "gabs")
    ]

    constructor(private messageService: MessageService) { }

    ngOnInit(): void {
        // this.messageS = this.messageService.getMessages();
        this.messageService.getMessages()
            .subscribe(
                (successData: Message[]) => {
                    this.messageS = successData;
                    console.log(successData)
                },
                errData => console.log(errData)
            )
    }

}