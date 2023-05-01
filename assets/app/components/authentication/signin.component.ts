import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "./user.services";


@Component({
    selector: "app-signin",
    templateUrl: "../../templates/authentication/signin.component.html",
    providers: [UserService],
    styleUrls: ["../../scss/style.css"]
})

export class SigninComponent implements OnInit {

    formSignIn: FormGroup;


    constructor(private FormBuilder: FormBuilder, private userService: UserService) { }

    onSubmit() {

        const userLogin = {
            email: this.formSignIn.value.email,
            password: this.formSignIn.value.password,
        }

        this.userService.getUser(userLogin).subscribe(
            (successData) => window.location.href="/",
            (errData) => alert("Usuário não encontrado")
        )

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