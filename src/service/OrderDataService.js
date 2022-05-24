import axios from "axios";
import { conf } from "../Config.js";
import MasterService from "./MasterService";
const PC_URL = conf.url.PC_URL + "/api/v1/workingOrder";
const PC_ORDER_URL = conf.url.PC_URL + "/api/v1/order";

class OrderDataService {
    queryPendingOrdersByStore(payload) {
        //var CURRENT_API_URL = `${PC_URL}/queryPendingOrdersByStore/`;
        //return MasterService.postDataService(CURRENT_API_URL, payload);
        return axios.get("assets/demo/data/ordersJson.json").then((res) => res.data);
    }

    queryOrdersByStore(payload) {
        var CURRENT_API_URL = `${PC_URL}/queryOrdersByStore/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
        //return axios.get("assets/demo/data/ordersJson.json").then((res) => res.data);
    }

    queryOrdersOnProcessByStore(payload) {
        var CURRENT_API_URL = `${PC_URL}/queryOrdersOnProcessByStore/`;
        //return axios.get("assets/demo/data/servicesByOperator.json").then((res) => res.data);
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    queryWorkingOrdersOnProcessByStoreAndOperator(payload) {
        var CURRENT_API_URL = `${PC_URL}/queryWorkingOrdersOnProcessByStoreAndOperator/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    queryOrderHeaderByWorkingOrderId(payload) {
        var CURRENT_API_URL = `${PC_URL}/queryOrderHeaderByWorkingOrderId/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    // Process

    startWorkingOrder(payload) {
        var CURRENT_API_URL = `${PC_URL}/startWorkingOrder/`;
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

    //ORDER

    createOrder(payload) {
        var CURRENT_API_URL = `${PC_ORDER_URL}/createOrder`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    queryOrdersByMcuAndType(payload){
        var CURRENT_API_URL = `${PC_ORDER_URL}/queryOrdersByMcuAndType`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }
}

export default new OrderDataService();
