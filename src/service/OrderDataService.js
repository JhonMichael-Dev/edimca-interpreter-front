import axios from "axios";

class OrderDataService {
    queryOrdersByStore(payload) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/ordersJson.json").then((res) => res.data);
    }

    queryStoppedOrdersByStore(payload) {
        return axios.get("assets/demo/data/ordersStoppedJson.json").then((res) => res.data);
    }

    queryIncomingOrdersByStore(payload) {
        return axios.get("assets/demo/data/ordersTransferedIncomingJson.json").then((res) => res.data);
    }
    queryIncomingOrdersByStoreVL(payload) {
        return axios.get("assets/demo/data/orderVLJson.json").then((res) => res.data);
    }
}

export default new OrderDataService();
