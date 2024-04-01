import express from "express";
import { canUserReview, deleteProduct, getProductDetails, getProducts, newProduct, updateProduct,createProductReview,getProductReviews,deleteReview, getAdminProducts } from '../controllers/productController.js'
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();


router.route("/products")
      .get(getProducts);
      
router.route("/admin/products")
      .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct)
      .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/products/:id").get(getProductDetails);

router.route("/admin/products/:id")
      .put(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/admin/products/:id")
      .delete(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

router.route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .put(isAuthenticatedUser, createProductReview);

router.route("/admin/reviews")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteReview);

router.route("/can_review").get(isAuthenticatedUser, canUserReview);

export default router;