import axios from "axios";

class OperatorDataService {
    queryStopReasons(mcu) {
        return axios.get("assets/demo/data/serviceStopReason.json").then((res) => res.data);
    }
}

export default new OperatorDataService();
