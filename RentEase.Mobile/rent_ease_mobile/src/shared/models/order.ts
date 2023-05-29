import { Item } from "./item";
import { User } from "./user";

export class Order {
    id:number = 0;
    dateFrom:Date = new Date();
    dateTo:Date = new Date();
    deliveryAddress:string = "";
    isConfirmed:boolean = false;
    isDelivered:boolean = false;
    isFinished:boolean = false;
    itemId:number = 0;
    item:Item = new Item();
    tenantId:string = "";
    tenant:User = new User();
}