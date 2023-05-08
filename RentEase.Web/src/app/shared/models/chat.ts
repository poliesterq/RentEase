import { Message } from "./message";
import { User } from "./user";

export class Chat {
    id?:string;
    title?:string;
    messages?:Message[];
    users:User[];
}