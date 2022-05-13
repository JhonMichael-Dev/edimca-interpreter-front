import MasterService from "./MasterService";
import { conf } from "../Config.js";
const NOTIFICATION_API_URL = conf.url.API_URL + "/api/v1/notification";

class NotificationDataService {

    queryNextMaintenance(payload) {
        var CURRENT_API_URL = `${NOTIFICATION_API_URL}/queryNextMaintenance`;
        return MasterService.postDataServiceJSONHeader(CURRENT_API_URL, payload);
    }

}
export default new NotificationDataService();