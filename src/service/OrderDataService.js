import axios from "axios";

class OrderDataService {
    queryOrdersByStore(payload) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/ordersJson.json").then((res) => res.data);
    }
}

export default new OrderDataService();
