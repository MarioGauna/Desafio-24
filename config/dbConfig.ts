import { MongoClient } from "../deps.ts";
import { Product } from "../types/productType.ts";
import { config } from "../deps.ts";

const ENV = config();

const client = new MongoClient();

try {
    await client.connect(`mongodb+srv://${ENV.MONGO_USER}:${ENV.MONGO_PASS}@${ENV.MONGO_CLUSTER}/${ENV.MONGO_DB}?authMechanism=SCRAM-SHA-1`);
    console.log("Conectado a MongoDB");
} catch (error) {
    console.log(error);
}

const db = client.database('almacen');

export const productos = db.collection<Product>('productos');