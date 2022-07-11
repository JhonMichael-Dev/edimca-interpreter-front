import { conf } from "../Config.js";
import MasterService from "./MasterService";
import axios from "axios";
const GENERAL_API_URL = conf.url.API_URL + "/file";

class FileStorageService {
    storeLeptonFile(payload) {
        var CURRENT_API_URL = `${GENERAL_API_URL}/storeFile`;
        const header = "multipart/form-data";
        return MasterService.postDataService(CURRENT_API_URL, payload, header);
    }

    translateFile(payload) {
        var CURRENT_API_URL = `${GENERAL_API_URL}/translateFile`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    html(param) {
        var CURRENT_API_URL = `${GENERAL_API_URL}/getFile/` + param;
        return axios
            .get(CURRENT_API_URL, {
                responseType: "arraybuffer",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/xml",
                },
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
export default new FileStorageService();
