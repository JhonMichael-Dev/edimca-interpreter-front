import axios from "axios";

class StoreDataService {
    queryStores() {
        return axios.get("assets/demo/data/storeJson.json").then((res) => res.data.data);
    }
}

export default new StoreDataService();
