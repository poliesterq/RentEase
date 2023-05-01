import { Role } from "../enums/role.enum";

export class User {
    id?:string;
    firstName:string;
    lastName: string;
    email:string;
    phoneNumber?:string;
    password?:string;
    role?:Role;
    roles?:string[];
}