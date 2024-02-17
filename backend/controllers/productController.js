
import Product from "../models/product.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getProducts = async (req, res) => {

    const products = await Product.find();
    
    res.status(200).json({
        products,
    });
};

// Create new Product => /api/v1/admin/products
export const newProduct = async (req, res) => {
    const product = await Product.create(req.body);

    res.status(200).json({
        product,
    });

};

// Get single product details => /api/v1/products/:id
export const getProductDetails = async (req, res, next) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        // next() - use the next middleware in the middleware stack, which is errors middleware
        return next(new ErrorHandler("Product Not Found", 404));
    }

    res.status(200).json({
        product,
    });

};

// update product details => /api/v1/products/:id
export const updateProduct = async (req, res) => {
    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req?.params?.id, req.body, {
        new: true,
    });

    res.status(200).json({
        product,
    });

};

// delete product => /api/v1/products/:id
export const deleteProduct = async (req, res) => {
    const product = await Product.findById(req?.params?.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.deleteOne();

    
    res.status(200).json({
        message: "Product Deleted",
    });

};