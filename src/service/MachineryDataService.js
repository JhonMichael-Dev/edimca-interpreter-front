import axios from "axios";
import { conf } from "../Config.js";
import MasterService from "./MasterService";
const MACHINE_API_URL = conf.url.PC_URL + "/api/v1/machine";

class MachineryDataService {
    queryMachineryByWh(mcu) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/machineryByWh.json").then((res) => res.data);
    }
    queryMachineryByWhMan(mcu) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/machineryMaintenace.json").then((res) => res.data);
    }

    getMachineAll() {
        var CURRENT_FILE_URL = `${MACHINE_API_URL}/allMachine`;
        //console.log(".....", MasterService.getDataServiceJSONHeader(CURRENT_FILE_URL));
        return MasterService.getDataServiceJSONHeader(CURRENT_FILE_URL);
    }

    getServiceType() {
        var CURRENT_FILE_URL = `${MACHINE_API_URL}/getServiceType`;
        return MasterService.getDataServiceJSONHeader(CURRENT_FILE_URL);
    }

    productsByServiceType(payload){
        var CURRENT_API_URL = `${MACHINE_API_URL}/productsByServiceType`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }
}

export default new MachineryDataService();
