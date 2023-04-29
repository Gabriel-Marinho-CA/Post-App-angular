import { Injectable } from "@angular/core";
import { User } from "../../models/user.model";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  private headersReq = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  addUser(user: User) {
    const reqBody = JSON.stringify(user);

    return this.http
      .post("http://localhost:3000/api/autenticacao/signup", reqBody, {
        headers: this.headersReq,
      })
      .map((res: Response) => {
        res.json();
        console.log(res);
      })
      .catch((err: Response) => Observable.throw(err));
  }

  getUser(userLogin: any) {

    const reqBody = JSON.stringify(userLogin);

    return this.http
      .post("http://localhost:3000/api/autenticacao/signin", reqBody, { headers: this.headersReq })
      .map((response: Response) => {

        const resJson = (response.json()).userLogin;

        const userLogged = {
          fname: resJson.firstName,
          id: resJson._id
        }

        localStorage.setItem('User Logged', `${userLogged.fname},${userLogged.id}`);

        // console.log(localStorage.getItem('User Logged'));

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
