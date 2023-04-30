export class Message {
    author: string;
    content: string;
    messageId?: string;
    userId?: string;


    constructor(author: string, content: string, messageId?: string,userId?: string) {
        this.author = author;
        this.content = content;
        this.messageId = messageId;
        this.userId = userId;
    }
}