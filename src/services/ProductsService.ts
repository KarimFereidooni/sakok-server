import { Product } from "../models/Product";
import { injectable } from "inversify";

@injectable()
export class ProductsService {
  public async getProducts(filter = {}) {
    return await Product.find(filter);
  }

  public async getProductsCount(filter = {}) {
    return await Product.count(filter);
  }

  public async createProduct(data) {
    if (!data._id) delete data._id;
    const newProduct = new Product(data);
    await newProduct.save();
  }

  public async deleteProduct(productID) {
    await Product.findByIdAndDelete(productID);
  }

  public async updateProduct(productId, data) {
    await Product.findByIdAndUpdate(productId, data);
  }
}
