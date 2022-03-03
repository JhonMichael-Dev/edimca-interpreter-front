import axios from "axios";

class OperatorDataService {
    queryOperatorByStore(mcu) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/operatorsJson.json").then((res) => res.data);
    }

    queryServicesByOperator(mcu) {
        return axios.get("assets/demo/data/servicesByOperator.json").then((res) => res.data);
    }
}

export default new OperatorDataService();
