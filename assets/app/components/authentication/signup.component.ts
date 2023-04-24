import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";


@Component({
    selector: "app-signup",
    templateUrl: "../../templates/authentication/signup.component.html"
})

export class SignupComponent implements OnInit {

    formSignUp: FormGroup;

    onSubmit() {
        console.log(this.formSignUp.value);
        this.formSignUp.reset();
    }

    ngOnInit(): void {
        this.formSignUp = new FormGroup({
            fname: new FormControl('', [Validators.required]),
            lname: new FormControl('', [Validators.required]),
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]),
            password: new FormControl('', [Validators.required])
        })
    }
    constructor() { }
}