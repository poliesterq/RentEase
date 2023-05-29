import { Category } from "../enums/category.enum";
import { Order } from "./order";
import { User } from "./user";

export class Item {
    id:number = 0;
    title:string = '';
    description:string = '';
    category:Category = 0;
    priceUS:number = 0;
    priceUA?:number = 0;
    address:string = '';
    imageUrl:string = '';
    isAvaiable:boolean = false;
    landlordId:string = '';
    landlord?:User = new User();
    orders?:Order[];
}