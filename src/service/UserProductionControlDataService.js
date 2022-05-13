import MasterService from "./MasterService";
import axios from "axios";
import { conf } from "../Config.js";
const USERCP_API_URL = conf.url.API_URL + "/api/v1/user";

class UserProductionControlDataService {
    login(payload, error) {
        var CURRENT_API_URL = `${USERCP_API_URL}/login/`;
        let axiosConfig = {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
            },
        };
        return axios
            .post(CURRENT_API_URL, payload, axiosConfig)
            .then((response) => {
                return response;
            })
            .catch((err) => {
                //console.log(err);
                error();
            });
    }

    /*
  quickSearch(param) {
    var CURRENT_API_URL = `${PRODUCT_API_URL}/quickSearch/` + param;
    return axios
      .get(CURRENT_API_URL)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  queryUserStoresByUsername(param) {
    var CURRENT_API_URL =
      `${PRODUCT_API_URL}/queryUserStoresByUsername/` + param;
    return axios
      .get(CURRENT_API_URL)
      .then((response) => {
        return response;
      })
      .catch((err) => {
        //console.log(err);
      });
  }

  userCashByStore(payload) {
    var CURRENT_API_URL = `${PRODUCT_API_URL}/userCashByStore/`;
    return MasterService.postDataServiceJSONHeader(CURRENT_API_URL, payload);
  }
  */
}
export default new UserProductionControlDataService();
