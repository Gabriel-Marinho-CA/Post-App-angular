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
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService) {}

  formSignUp: FormGroup;

  onSubmit() {
    console.log(this.formSignUp.value);
    this.userService.addUser(this.formSignUp.value).subscribe(
      (successData) => console.log(successData),
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
