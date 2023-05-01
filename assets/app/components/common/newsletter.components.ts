import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "../message/message.services";



@Component({
    selector: "app-newsletter",
    templateUrl: "../../templates/common/newsletter.component.html",
    styleUrls: ["../../scss/style.css"]
})

export class NewsletterComponent implements OnInit {

    formNewsletter: FormGroup;

    knowings = [
        { id: '1', value: 'Por amigos' },
        { id: '2', value: 'Pela internet' },
        { id: '3', value: 'Outros' },
    ]

    constructor(private messageService: MessageService) { }

    onSubmit() {

        this.messageService.newsLetter(this.formNewsletter.value).subscribe(
            (successData) => alert("Newsletter cadastrada :)"),
            (errData) => console.log(errData)
        );

        this.formNewsletter.reset();
    }

    ngOnInit(): void {
        this.formNewsletter = new FormGroup({
            gender: new FormControl("", [Validators.required]),
            knowing: new FormControl("", [Validators.required]),
            confirmSignup: new FormControl("", [Validators.required]),
            emailNews: new FormControl("", [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+"),
              ]),
        });
    }

}
