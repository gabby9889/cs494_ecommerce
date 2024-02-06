
import Product from "../models/product.js";

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
        return res.status(404).json({
            error: "Products not found",
        });
    }

    res.status(200).json({
        product,
    });

};

// update product details => /api/v1/products/:id
export const updateProduct = async (req, res) => {
    let product = await Product.findById(req?.params?.id)

    if (!product) {
        return res.status(404).json({
            error: "Products not found",
        });
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
        return res.status(404).json({
            error: "Products not found",
        });
    }

    await product.deleteOne();

    
    res.status(200).json({
        message: "Product Deleted",
    });

};