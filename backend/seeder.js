import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Product from "./models/productModel.js";

dotenv.config({ path: "./backend/.env" });

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    image: "https://via.placeholder.com/200x200?text=Headphones",
    stock: 20,
  },
  {
    name: "Smart Watch",
    description: "Track your fitness, health, and notifications with style.",
    price: 149.99,
    image: "https://via.placeholder.com/200x200?text=Smart+Watch",
    stock: 15,
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with powerful bass and clear sound.",
    price: 59.99,
    image: "https://via.placeholder.com/200x200?text=Speaker",
    stock: 25,
  },
  {
    name: "Gaming Mouse",
    description: "Ergonomic design with customizable buttons and RGB lighting.",
    price: 39.99,
    image: "https://via.placeholder.com/200x200?text=Mouse",
    stock: 30,
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit keyboard with blue switches for tactile feedback.",
    price: 79.99,
    image: "https://via.placeholder.com/200x200?text=Keyboard",
    stock: 18,
  },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Sample products inserted successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error inserting products:", error);
    process.exit(1);
  }
};

importData();
