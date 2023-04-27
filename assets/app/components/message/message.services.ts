import { Injectable } from "@angular/core";
import { Message } from "../../models/message.model";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class MessageService {
    private messageSService: Message[] = [];

    constructor(private http: Http) { };

    addMessage(message: Message) {
        this.messageSService.push(message);

        const reqBody = JSON.stringify(message);
        const headersReq = new Headers(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        );

        return this.http.post('http://localhost:3000/mensagens', reqBody, { headers: headersReq })
            .map((res: Response) => { res.json(); console.log(res) })
            .catch((err: Response) => Observable.throw(err))

    }

    getMessages() {
        // return this.messageSService;

        const headersReq = new Headers(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        );

        return this.http.get('http://localhost:3000/mensagens', { headers: headersReq })
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

    updateMessage(message: Message) {
        const headersReq = new Headers(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        );

        console.log(message);
        const reqBody = message;

        return this.http.put(`http://localhost:3000/mensagens`, reqBody).map((response) => {
            console.log(response.json());
        })
            .catch((err: Response) => Observable.throw(err));
    }


    deleteMessage(message: Message) {

        return this.http.delete(`http://localhost:3000/mensagens/${message.userId}`)
            .map((response) => {
                window.location.href = "/";
            })
            .catch((err: Response) => Observable.throw(err));
        // this.messageSService.splice(this.messageSService.indexOf(message), 1);

    }
}