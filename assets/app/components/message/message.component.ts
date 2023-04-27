import { Component, Input, Output } from "@angular/core";
import { Message } from '../../models/message.model';
import { EventEmitter } from '@angular/core';


@Component({
    selector: 'app-message',
    templateUrl: '../../templates/message/message.component.html',
    styles: [
        `
        .MessageComponentWrapper {
            max-width: 650px;
            margin: 3rem auto;
        }
        `

    ]

})
export class MessageComponent {
    constructor() {
    }
}