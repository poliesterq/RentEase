import { Category } from "../enums/category.enum";

export class ItemSearchParameters {
    searchParaneter?:string;
    categories:Category[];
    address?:string;
    priceMinUS?:number;
    priceMaxUS?:number;
    landlordId?:string;
    isAvailable?:boolean;
}