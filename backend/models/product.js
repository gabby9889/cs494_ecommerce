import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
 name: {
    type: String,
    required: [true, "Please enter product name"],
    maxLength: [200, "Product name cannot exceed 200 characters"],
 },
 price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product price cannot exceed 5 digits"],
 },
 description: {
    type: String,
    required: [true, "Please enter product description"],
 },
 ratings: {
    type: Number,
    default: 0
 },
  image: [
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product category"],
    enum: {
        values: [
            "Navigation",
            "Protection and Shelter",
            "Clothing and Footwear",
            "Cooking and Hydration",
            "Lighting",
            "Tools and Repair Items",
            "Health and Safety",
            "Miscellaneous",

        ],
        message: "Please select correct category",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,  //id of the user
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
       comment: {
            type: String,
            required: true,
        },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,  //id of the user
    ref: 'User',
    required: true,
  },

 
 },
 { timestamps: true }
);

export default mongoose.model("Product", productSchema);