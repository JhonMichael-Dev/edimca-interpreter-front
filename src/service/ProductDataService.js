import axios from "axios";
import MasterService from "./MasterService";
import { conf } from "../Config.js";
const API_URL = conf.url.API_URL + "/api/v1/apiProduct";

export class ProductDataService {
    queryProductByCode(payload) {
        var CURRENT_API_URL = `${API_URL}/queryProductByCode/`;
        return MasterService.postDataService(CURRENT_API_URL, payload, "text/plain");
    }

    getProductsSmall() {
        return axios.get("assets/demo/data/products-small.json").then((res) => res.data.data);
    }

    getProducts() {
        return axios.get("assets/demo/data/products.json").then((res) => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get("assets/demo/data/products-orders-small.json").then((res) => res.data.data);
    }
}

export default new ProductDataService();
