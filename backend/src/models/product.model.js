import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const detailSchema = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
    lowercase: true,
  },
  color: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
    min: [0, "Weight must be a positive number"],
  },
});

const productImageSchema = new mongoose.Schema({
  mainImage: {
    type: String,
    required: true,
  },
  secondImage: {
    type: String,
    required: true,
  },
  thirdImage: {
    type: String,
  },
});

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: productImageSchema,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCatogary",
    },
    description: {
      type: String,
      required: true,
    },
    details: {
      type: detailSchema,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be a positive number"],
    },
    stock: {
      type: Number,
      default: 0,
    },
    avaible: {
      type: Boolean,
      default: false,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongooseAggregatePaginate);
export const Product = mongoose.model("Product", productSchema);
