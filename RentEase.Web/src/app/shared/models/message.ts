import { User } from "./user";

export class Message {
    id:string;
    text:string;
    author:User;
    sendTime:Date;
    isRead:boolean;
}