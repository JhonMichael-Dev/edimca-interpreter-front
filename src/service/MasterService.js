import axios from "axios";
//import Tokenize from "./Tokenize";
import DataStore from "../data/DataStore";

class MasterService {
    /*
    decryptedToken = () => {
        return Tokenize.decryptToken(DataStore.token, DataStore.user.username);
    };*/

    getDataService(apiUrl) {
        return axios
            .get(apiUrl, {
                headers: {
                    //   Authorization: this.decryptedToken()
                },
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                //console.log(err);
            });
    }

    postDataService(...args) {
        let uri = args[0];
        let payload = args[1];
        let contentType = args[2];
        return axios
            .post(uri, payload, {
                headers: {
                    "Content-Type": contentType ? contentType : "application/json; charset=utf-8",
                },
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                //console.log(err);
                if (args[2] !== undefined) {
                    args[2](err);
                }
            });
    }

    getDataServiceJSONHeader(apiUrl) {
        return axios
            .get(apiUrl, {
                headers: {
                    // Authorization: this.decryptedToken(),
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                //console.log(err);
            });
    }

    postDataServiceJSONHeader(...args) {
        let uri = args[0];
        let payload = args[1];
        return axios
            .post(uri, payload, {
                headers: {
                    //   Authorization: this.decryptedToken(),
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                //console.log(err);
                if (args[2] !== undefined) {
                    args[2](err);
                }
            });
    }

    postEmptyDataServiceJSONHeader(...args) {
        let uri = args[0];
        return axios
            .post(uri, {
                headers: {
                    //   Authorization: this.decryptedToken(),
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                //console.log(err);
                if (args[1] !== undefined) {
                    args[1]();
                }
            });
    }

    putDataServiceJSONHeader(...args) {
        return axios
            .put(args[0], args[1], {
                headers: {
                    //   Authorization: this.decryptedToken(),
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                //console.log(err);
                if (args[2] !== undefined) {
                    args[2]();
                }
            });
    }
}

export default new MasterService();
