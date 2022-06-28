import axios from "axios";
import { conf } from "../Config.js";
import MasterService from "./MasterService";
const MAINTENANCE_ORDER_API_URL = conf.url.PC_URL + "/api/v1/machineryMaintenance";

class MaintenanceOrderService {

    queryMachineryMaintenanceOrdersByAssetNumber(payload) {
        var CURRENT_API_URL = `${MAINTENANCE_ORDER_API_URL}/queryMachineryMaintenanceOrdersByAssetNumber/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

}

export default new MaintenanceOrderService();