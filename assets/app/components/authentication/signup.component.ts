import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.services";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-signup",
  providers: [UserService],
  templateUrl: "../../templates/authentication/signup.component.html",
  styleUrls: ["../../scss/style.css"]
})

export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}

  formSignUp: FormGroup;

  onSubmit() {
    this.userService.addUser(this.formSignUp.value).subscribe(
      (successData) => window.location.href="/autenticacao/signin",
      (errData) => console.log(errData)
    );

    this.formSignUp.reset();
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
