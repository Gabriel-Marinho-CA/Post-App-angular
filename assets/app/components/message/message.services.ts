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
            .map((res: Response) => window.location.href = "/")
            .catch((err: Response) => Observable.throw(err))

    }

    getMessages() {
        // return this.messageSService;

        return this.http.get('http://localhost:3000/api/mensagens', { headers: this.headersReq })
            .map((response: Response) => {

                const dataResponse = response.json();

                const messagesContent = dataResponse.data;

                let allMessageContent: Message[] = [];

                for (let msg of messagesContent) {
                    allMessageContent.push(new Message('gabriel', msg.content, msg._id, null))
                }

                this.messageSService = allMessageContent;


                return allMessageContent;
            })
            .catch((err: Response) => Observable.throw(err));
    }

    updateMessage(updtadedMessage: Message, message: Message) {

        const newMsg = updtadedMessage;


        const reqBody = JSON.stringify(newMsg);

        return this.http.put(`http://localhost:3000/api/mensagens/${message.userId}`, reqBody, { headers: this.headersReq }).map((response) => {
            window.location.href = "/";
        })
            .catch((err: Response) => Observable.throw(err));
    }


    deleteMessage(message: Message) {

        const id = message.userId;
        console.log(message)

        return this.http.delete(`http://localhost:3000/api/mensagens/${id}`, { headers: this.headersReq })
            .map((response) => {
                window.location.href = "/";
            })
        // this.messageSService.splice(this.messageSService.indexOf(message), 1);

    }
}