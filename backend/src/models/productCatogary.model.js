import mongoose from "mongoose";

const productCatogarySchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductCatogary = mongoose.model(
  "ProductCatogary",
  productCatogarySchema
);
