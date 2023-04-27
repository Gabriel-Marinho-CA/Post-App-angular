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
            .map((res: Response) => {res.json(); console.log(res)})
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

        return this.http.get('http://localhost:3000/mensagens',{headers:headersReq})
            .map((res: Response) => {
                console.log(res)
                // const resJson = res.json();

                // console.log(resJson);
                // const msgRes = resJson.data

                // let transformedCastMessageModelFrontend: Message[] = [];

                // for (let msg of msgRes) {
                //     transformedCastMessageModelFrontend.push(
                //         new Message(msg.content, 'gab', msg._id, null)
                //     );
                // }

                // this.messageSService = transformedCastMessageModelFrontend;
                // return transformedCastMessageModelFrontend;
            })
            .catch((err: Response) => Observable.throw(err));
    }

    updateMessage(message: Message) {

    }


    deleteMessage(message: Message) {
        this.messageSService.splice(this.messageSService.indexOf(message), 1);

    }
}