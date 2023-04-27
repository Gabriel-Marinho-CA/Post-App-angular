import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import "rxjs/Rx";
import { Observable } from "rxjs";

@Component({
  selector: "app-signup",
  templateUrl: "../../templates/authentication/signup.component.html",
})
export class SignupComponent implements OnInit {
  formSignUp: FormGroup;
  constructor(private http: Http) {}

  onSubmit() {
    console.log(this.formSignUp.value);

    return this.http
      .post(
        "http://localhost:3000/autenticacao/signup",
        JSON.stringify(this.formSignUp.value)
      )
      .map((res: Response) => {
        res.json();
      })
      .catch((err: Response) => Observable.throw(err));
  }

  ngOnInit(): void {
    this.formSignUp = new FormGroup({
      fname: new FormControl("", [Validators.required]),
      lname: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+"),
      ]),
      password: new FormControl("", [Validators.required]),
    });
  }
}
