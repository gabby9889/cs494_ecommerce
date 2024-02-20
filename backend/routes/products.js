import express from "express";
import { deleteProduct, getProductDetails, getProducts, newProduct, updateProduct } from '../controllers/productController.js'
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();


router.route("/products")
      
router.route("/admin/products")
      .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router.route("/products/:id").get(getProductDetails);

router.route("/admin/products/:id")
      .put(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/admin/products/:id")
      .delete(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

export default router;