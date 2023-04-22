import { Component } from '@angular/core';
import { Message } from '../app/models/message.model';
import { MessageService } from './components/message/message.services';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ["./scss/style.css"], 
    providers:[MessageService]
})
export class AppComponent {

    contentMessage = {
        content: "Lorem ipsum dolor sit ammet",
        author: "Gabriel Marinho"
    }
    messageS: Message[] = [
        new Message("t1", "gabs"),
        new Message("t2", "gabs"),
        new Message("t3", "gabs")
    ]


    constructor() { }

    onChangeNumber(e) {

    }

}
// import { Component } from '@angular/core';
// import { Message } from '../app/models/message.model';

// @Component({
//     selector: 'my-app',
//     templateUrl: './app.component.html',
// })
// export class AppComponent {
//     // message = {
//     //     content: 'Lorem ipsum message.',
//     //     author: 'Stans'
//     // }
//     teste = "ola";
//     userName = "Gabriel"
//     message: Message = new Message("", "");
//     messageAlias: Message = new Message("", "");
//     messageTesteComponent: Message = new Message("Cu", "Doce");

//     constructor() { }

//     onChangeNumber(e) {
//         this.teste = e
//     }

// }