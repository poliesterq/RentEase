import { Item } from "./item";
import { User } from "./user";

export class Order {
    id:number;
    dateFrom:Date;
    dateTo:Date;
    deliveryAddress:string;
    isConfirmed:boolean;
    isDelivered:boolean;
    isFinished:boolean;
    itemId:number;
    item:Item;
    tenantId:string;
    tenant:User;
}