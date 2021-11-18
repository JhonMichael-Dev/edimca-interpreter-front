import MasterService from "./MasterService";
import { conf } from "../Config.js";
const ORDER_API_URL = conf.url.API_URL + "/api/v1/devolution";

class DevolutionDataService {
    queryOrderResponsePlusDevolutions(payload) {
        var CURRENT_API_URL = `${ORDER_API_URL}/queryOrderResponsePlusDevolutions/`;
        return MasterService.postDataServiceJSONHeader(CURRENT_API_URL, payload);
    }

    syncDevolutionToJde(payload) {
        var CURRENT_API_URL = `${ORDER_API_URL}/syncDevolutionToJde/`;
        return MasterService.postDataServiceJSONHeader(CURRENT_API_URL, payload);
    }

    syncDevolutionToJdeGroupedByInvoice(payload) {
        var CURRENT_API_URL = `${ORDER_API_URL}/syncDevolutionToJdeGroupedByInvoice/`;
        return MasterService.postDataServiceJSONHeader(CURRENT_API_URL, payload);
    }
}
export default new DevolutionDataService();
