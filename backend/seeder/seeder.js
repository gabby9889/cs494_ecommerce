import mongoose from "mongoose";
import products from "./data.js";
import orders from "./order.js";
import Product from "../models/product.js";
import Order from "../models/order.js";

const seedProducts = async () => {
    try {

        await mongoose.connect("mongodb://localhost:27017/shopit-v2");

        await Product.deleteMany();
        console.log('Products are deleted');
        await Order.deleteMany();
        console.log('Orders are deleted');

        await Product.insertMany(products);
        console.log('Products are added');
        await Order.insertMany(orders);
        console.log('Orders are added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedProducts();