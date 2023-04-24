import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
    selector: "app-signin",
    templateUrl: "../../templates/authentication/signin.component.html"
})

export class SigninComponent implements OnInit {

    formSignIn: FormGroup;


    constructor(private FormBuilder: FormBuilder) { }

    onSubmit() {
        console.log(this.formSignIn.value);
        this.formSignIn.reset();
    }

    ngOnInit() {
        this.formSignIn = this.FormBuilder.group({
            email: [null, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
            ]],
            password: [null, Validators.required]
        })
    }
}