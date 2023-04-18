import axios from "axios";
import { environment } from "../environments/dev.env";
import { Product } from "../interfaces/products.interface";

export const productsService = {
  getProducts: async () => {
    try {
      const response = await axios.get<Product[]>(environment.apiUrl);
      return response.data;
    } catch (_) {
      throw new Error("Error while fetching products");
    }
  },
  getProduct: async (id: number) => {
    try {
      const response = await axios.get<Product>(`${environment.apiUrl}/${id}`);
      return response.data;
    } catch (_) {
      throw new Error("Error while fetching product");
    }
  },
};
