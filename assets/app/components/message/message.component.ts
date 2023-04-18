import { Component, Input, Output } from "@angular/core";
import { Message } from '../../models/message.model';
import { EventEmitter } from '@angular/core';


@Component({
    selector: 'app-message',
    templateUrl: '../../templates/message.component.html',

    styleUrls: ["../../scss/partials/cardsChat.css"]
})
export class MessageComponent {

    classesCard = ["wrap-card-msg"];

    @Input() contentMessage: Message = new Message("", "");

    onEdit() {

    }

    constructor() {
    }
}
// import { Component, Input, Output } from "@angular/core";
// import { Message } from '../../models/message.model';
// import { EventEmitter } from '@angular/core';

// @Component({
//     selector: 'app-message',
//     templateUrl: './message.component.html',
//     styles: [""]
// })
// export class MessageComponent {

//     color = 'red';
//     classes = ["green-bg", 'small-card'];
//     canShow: boolean = true;
//     myName: string = "gab";

//     @Input() propMessage: Message = new Message("", "");
//     @Input('messageAliasP') propMessageAlias: Message = new Message("", "");

//     @Input() name: string = '';

//     @Input() messageTest: Message = new Message("", "");


//     @Output() changeNumber: EventEmitter<string> = new EventEmitter();

//     // @Output() changeCard: EventEmitter = new EventEmitter();

//     @Input() messageVarClass: Message = new Message("", "");

//     onEdit() {
//         // this.changeCard.emit("Emitido no filho");
//         this.changeNumber.emit("123");
//     }

//     constructor() {
//         console.log('@propMessage', this.propMessage);
//     }
// }