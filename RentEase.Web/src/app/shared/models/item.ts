import { Category } from "../enums/category.enum";
import { Order } from "./order";
import { User } from "./user";

export class Item {
    id?:number;
    description:string;
    category:Category;
    priceUS:number;
    priceUA?:number;
    address:string;
    imageUrl:string;
    isAvaiable:boolean;
    landlordId:string;
    landlord?:User;
    orders?:Order[];
}