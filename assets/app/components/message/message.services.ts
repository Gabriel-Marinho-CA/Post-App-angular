import { Injectable } from "@angular/core";
import { Message } from "../../models/message.model";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class MessageService {
    private messageSService: Message[] = [];

    private headersReq = new Headers(
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    );

    constructor(private http: Http) { };

    addMessage(message: Message) {
        this.messageSService.push(message);

        const reqBody = JSON.stringify(message);

        return this.http.post('http://localhost:3000/api/mensagens', reqBody, { headers: this.headersReq })
            .map((res: Response) => {
                window.location.href = "/"
            })
            .catch((err: Response) => Observable.throw(err))
    }

    getMessages() {
        return this.http.get('http://localhost:3000/api/mensagens', { headers: this.headersReq })
            .map((response: Response) => {

                const messagesData = (response.json()).data;

                let allMessageContent: Message[] = [];

                for (let msg of messagesData) {
                    allMessageContent.push(new Message(msg.author, msg.content, msg.messageId, msg.userId));
                }

                this.messageSService = allMessageContent;

                return allMessageContent;
            })
            .catch((err: Response) => Observable.throw(err));
    }

    updateMessage(updtadedMessage: Message, { userId }: Message) {

        const reqBody = JSON.stringify(updtadedMessage);

        return this.http.put(`http://localhost:3000/api/mensagens/${userId}`, reqBody, { headers: this.headersReq }).map((response) => {
            window.location.href = "/";
        })
            .catch((err: Response) => Observable.throw(err));
    }


    deleteMessage({ userId }: Message) {

        return this.http.delete(`http://localhost:3000/api/mensagens/${userId}`, { headers: this.headersReq })
            .map((response) => {
                window.location.href = "/";
            })

    }
}