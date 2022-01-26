import axios from "axios";

class MachineryDataService {
    queryMachineryByWh(mcu) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/machineryByWh.json").then((res) => res.data);
    }
}

export default new MachineryDataService();
