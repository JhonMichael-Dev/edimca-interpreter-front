import axios from "axios";
import { conf } from "../Config.js";
import MasterService from "./MasterService";
const PC_URL = conf.url.PC_URL + "/api/v1/workingOrder";

class OrderDataService {
    queryPendingOrdersByStore(payload) {
        var CURRENT_API_URL = `${PC_URL}/queryPendingOrdersByStore/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    queryOrdersByStore(payload) {
        var CURRENT_API_URL = `${PC_URL}/queryOrdersByStore/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    processWorkingOrder(payload) {
        var CURRENT_API_URL = `${PC_URL}/processWorkingOrder/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
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
