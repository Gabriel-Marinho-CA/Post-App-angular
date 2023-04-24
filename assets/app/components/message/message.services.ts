import { Injectable } from "@angular/core";
import { Message } from "../../models/message.model";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";




@Injectable()
export class MessageService {
    private messageSService: Message[] = [];

    constructor(private http: Http) { };

    addMessage(message: Message) {
        this.messageSService.push(message);

        const reqBody = JSON.stringify(message);
        const headersReq = new Headers({ 'content-type': 'application/json' });


        // return this.http.post('mongodb+srv://gabriel:gabriel123-@cluster0.es8furw.mongodb.net/test', reqBody, {headers: headersReq} )

        return this.http.post('http://localhost:3000/message', reqBody, { headers: headersReq })
            .map((res: Response) => res.json())
            .catch((err: Response) => Observable.throw(err))
    }

    getMessages() {
        // return this.messageSService;

        return this.http.get('http://localhost:3000/mensagens')
            .map((res: Response) => {
                const resJson = res.json();

                console.log(resJson);
                const msgRes = resJson.objMessagS

                let transformedCastMessageModelFrontend: Message[] = [];

                for (let msg of msgRes) {
                    transformedCastMessageModelFrontend.push(
                        new Message(msg.content, 'gab', msg._id, null)
                    );
                }

                this.messageSService = transformedCastMessageModelFrontend;
                return transformedCastMessageModelFrontend;
            })
            .catch((err: Response) => Observable.throw(err));
    }
    deleteMessage(message: Message) {
        this.messageSService.splice(this.messageSService.indexOf(message), 1);

    }
}