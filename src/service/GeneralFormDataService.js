import { conf } from "../Config.js";
const GENERAL_API_URL = conf.url.API_URL;

class GeneralFormDataService {
    async asyncService(payload, url) {
        const CURRENT_API_URL = GENERAL_API_URL + url;
        //console.log("Servicio: " + CURRENT_API_URL);
        //console.log(payload);
        try {
            const requestOptions = {
                method: "POST",
                body: payload,
            };
            let response = await fetch(CURRENT_API_URL, requestOptions);
            let json = await response.json();
            return json;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}
export default new GeneralFormDataService();
