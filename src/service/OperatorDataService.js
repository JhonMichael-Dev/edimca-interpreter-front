import axios from "axios";
import { conf } from "../Config.js";
import MasterService from "./MasterService";
const PC_URL = conf.url.PC_URL + "/api/v1/operator";

class OperatorDataService {
    queryOperatorByStore(mcu) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/operatorsJson.json").then((res) => res.data);
    }

    queryCurrentServiceByOperator(mcu) {
        return axios.get("assets/demo/data/currentServiceByOperator.json").then((res) => res.data);
    }

    queryServicesByListOperatorTH() {
        return axios.get("assets/demo/data/operatorHumanTalent.json").then((res) => res.data);
    }

    queryServicesByListOperatorTHByBodega(data) {
        //console.log(data);
        return axios.get("assets/demo/data/operatorHumanTalent.json").then((res) => res.data);
    }

    queryServicesByListOperatorDC() {
        return axios.get("assets/demo/data/operatorDoctor.json").then((res) => res.data);
    }

    getAccountStateFilePath(fileName) {
        var CURRENT_FILE_URL = `${PC_URL}/getOperatorImageFile/` + fileName;
        return CURRENT_FILE_URL;
    }
}

export default new OperatorDataService();
