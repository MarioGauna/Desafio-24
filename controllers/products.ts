import { productos } from "../config/dbConfig.ts";
import { Context, helpers } from "../deps.ts";
import type { Product } from "../types/productType.ts";
import { Bson } from "../deps.ts";

export const getProducts = async(ctx: Context)=>{
    const response=await productos.find({}).toArray();
    if(response){
        ctx.response.body={
            message:"Listado de productos",
            response
        };
        ctx.response.status=200;
    } else {
        ctx.response.body={
            message:"Lista no encontrada"
        };
        ctx.response.status=404;
    }
}

export const getById = async(ctx: Context)=>{ 
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const response = await productos.findOne({ _id: new Bson.ObjectId(id)});
    if(response){
        ctx.response.body={
            message:"Producto encontrado",
            response
        };
        ctx.response.status=200;
    } else {
        ctx.response.body={
            message:"ID Inexistente"
        };
        ctx.response.status=404;
    }
}

export const createProduct = async(ctx: Context)=>{
    const response: Product = await ctx.request.body().value;
    response._id = new Bson.ObjectId();
    response.timestamp = new Date();
    await productos.insertOne(response);
    ctx.response.status = 201;
    ctx.response.body={
            message:"Producto Agregado",
            response
        };
}

export const updateProduct = async(ctx: Context)=>{
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    const product: Product = await ctx.request.body().value;
    try {
        const response = await productos.updateOne({ _id: new Bson.ObjectId(id) }, { $set: { ...product } }, { upsert: true });
        ctx.response.status = 200;
        ctx.response.body={
            message:"Producto Actualizado",
            response
        };
    } catch (error) {
        ctx.response.status=404;
        console.log(error);
    }
}

export const deleteProduct = async(ctx: Context)=>{
    const { id } = helpers.getQuery(ctx, { mergeParams: true });
    try {
        const response=await productos.deleteOne({ _id: new Bson.ObjectId(id)})
        if(response){
            ctx.response.body={
                message:"Producto Borrado"
            };
            ctx.response.status = 202;
        }
    } catch (error) {
        console.log(error);
    }
}