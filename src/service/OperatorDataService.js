import axios from "axios";
import { conf } from "../Config.js";
import MasterService from "./MasterService";
const PC_URL = conf.url.PC_URL + "/api/v1/operator";
const PC_URL_USERPOSSKILL = conf.url.PC_URL + "/api/v1/UserposSkill";
const PC_URL_USERPOSIMPAIRMENT = conf.url.PC_URL + "/api/v1/UserposImpairment";

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

    operatorHasPin(payload) {
        var CURRENT_API_URL = `${PC_URL}/operatorHasPin/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    updateOperatorPin(payload) {
        var CURRENT_API_URL = `${PC_URL}/updateOperatorPin/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    validateLast4DigitsFromIdentificationNumber(payload) {
        var CURRENT_API_URL = `${PC_URL}/validateLast4DigitsFromIdentificationNumber/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    loginOperator(payload) {
        var CURRENT_API_URL = `${PC_URL}/loginOperator/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    queryUserposDtoByUsername(payload) {
        var CURRENT_API_URL = `${PC_URL}/queryUserposDtoByUsername/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    getHumanTalentOperatorByStore(payload) {
        var CURRENT_API_URL = `${PC_URL}/humanTalentOperators/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    getImpairmentsOperatorsByStore(payload) {
        var CURRENT_API_URL = `${PC_URL}/impairmentsOperators/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    setHumanTalentOperator(payload) {
        var CURRENT_API_URL = `${PC_URL_USERPOSSKILL}/createUserposSkill/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    removeHumanTalentOperator(payload) {
        var CURRENT_API_URL = `${PC_URL_USERPOSSKILL}/deleteUserposSkill/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    setImpairmentOperator(payload){
        var CURRENT_API_URL = `${PC_URL_USERPOSIMPAIRMENT}/createUserposImpairment/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    updateImpairmentOperator(payload){
        var CURRENT_API_URL = `${PC_URL_USERPOSIMPAIRMENT}/updateUserImpairtment/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }

    removeImpairmentOperator(payload){
        var CURRENT_API_URL = `${PC_URL_USERPOSIMPAIRMENT}/deleteUserposImpairment/`;
        return MasterService.postDataService(CURRENT_API_URL, payload);
    }
}   

export default new OperatorDataService();
