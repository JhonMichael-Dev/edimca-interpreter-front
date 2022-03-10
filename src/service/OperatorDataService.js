import axios from "axios";

class OperatorDataService {
    queryOperatorByStore(mcu) {
        //return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
        return axios.get("assets/demo/data/operatorsJson.json").then((res) => res.data);
    }

    queryServicesByOperator(mcu) {
        return axios.get("assets/demo/data/servicesByOperator.json").then((res) => res.data);
    }

    queryCurrentServiceByOperator(mcu) {
        return axios.get("assets/demo/data/currentServiceByOperator.json").then((res) => res.data);
    }
    
    queryServicesByListOperatorTH() {
        return axios.get("assets/demo/data/operatorHumanTalent.json").then((res) => res.data);
    }
    queryServicesByListOperatorDC() {
        return axios.get("assets/demo/data/operatorDoctor.json").then((res) => res.data);
    }
}

export default new OperatorDataService();
