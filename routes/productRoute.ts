import { Router } from "../deps.ts";
import * as products from '../controllers/products.ts';

const router = new Router({prefix: "/products",});

router.get("/", products.getProducts);
router.get("/:id", products.getById);
router.post("/", products.createProduct);
router.put("/:id", products.updateProduct);
router.delete("/:id", products.deleteProduct);

export default router;