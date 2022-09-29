import{ ObjectId } from '../deps.ts';

export interface Product{
    _id:ObjectId,
    title:string,
    description:string,
    price:number,
    image:string,
    stock:number,
    timestamp:Date
}