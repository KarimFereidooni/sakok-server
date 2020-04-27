import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  properties: [{ name: String, value: String }],
});

export const Product = mongoose.model("product", ProductSchema);
