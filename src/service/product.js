import axios from "axios";
import { BASE_URL } from "../config/config";

const product = axios.create({ baseURL: `${BASE_URL}` });

export const getAllProducts = async (body) => product.get("/products", body);

export const getSingleProduct = async (body) => product.get(`/products/${body.productId}`)

export const getAllCategory = async () => product.get('/products/categories')