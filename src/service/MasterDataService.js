import axios from "axios";
import { conf } from "../Config.js";
const MASTER_DATA_API_URL = conf.url.PC_URL + "/api/v1/apiMasterData";

class MasterDataService {
    queryStopReasons(mcu) {
        return axios.get("assets/demo/data/serviceStopReason.json").then((res) => res.data);
    }


    queryMasterData(payload) {
        var CURRENT_API_URL = `${MASTER_DATA_API_URL}/queryMasterData/`;
        return axios
            .post(CURRENT_API_URL, payload)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                // console.log(err);
            });
    }

    queryMasterDataByParent(param) {
        var CURRENT_API_URL = `${MASTER_DATA_API_URL}/queryMasterDataByParent/` + param;
        return axios
            .get(CURRENT_API_URL)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                // console.log(err);
            });
    }

}

export default new MasterDataService();
