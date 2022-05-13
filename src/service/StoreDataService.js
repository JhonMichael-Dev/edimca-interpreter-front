import MasterService from "./MasterService";
import { conf } from "../Config.js";
const PC_URL = conf.url.PC_URL + "/api/v1/store";
const API_URL = conf.url.API_URL + "/api/v1/apiStore";

class StoreDataService {
    queryStores() {
        var CURRENT_API_URL = `${API_URL}/storeForSearch`;
        return MasterService.getDataServiceJSONHeader(CURRENT_API_URL);
    }
}

export default new StoreDataService();
