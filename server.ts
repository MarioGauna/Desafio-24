import { Application} from "./deps.ts";
import productRoute from './routes/productRoute.ts';
import './config/dbConfig.ts';

const app = new Application();

const PORT=8080;

app.use(productRoute.routes());

console.log(`Servidor iniciado en http://localhost:${PORT}`);
await app.listen({port:PORT});