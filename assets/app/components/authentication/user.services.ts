import { Injectable } from "@angular/core";
import { User } from "../../models/user.model";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  addUser(user: User) {
    const reqBody = JSON.stringify(user);
    const headersReq = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    return this.http
      .post("http://localhost:3000/autenticacao/signup", reqBody, {
        headers: headersReq,
      })
      .map((res: Response) => {
        res.json();
        console.log(res);
      })
      .catch((err: Response) => Observable.throw(err));
  }

  getUser() {
    // return this.userService;

    const headersReq = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });

    return this.http
      .get("http://localhost:3000/autenticacao/signin", { headers: headersReq })
      .map((response: Response) => {
        const dataResponse = response.json();

        const messagesContent = dataResponse.data;

        let allMessageContent: User[] = [];

        for (let msg of messagesContent) {
          allMessageContent.push(
            new User("gabriel", msg.content, msg._id, null)
          );
        }

        //this.userService = allMessageContent;

        return allMessageContent;
      })
      .catch((err: Response) => Observable.throw(err));
  }

  // deleteUser(user: User) {

  //     return this.http.delete(`http://localhost:3000/mensagens/${user}`)
  //         .map((response) => {
  //             window.location.href = "/";
  //         })
  //         .catch((err: Response) => Observable.throw(err));
  //     this.userService.splice(this.userService.indexOf(user), 1);

  // }
}
