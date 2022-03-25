import GeneralFormDataService from "./GeneralFormDataService";

class FileStorageService {

    async storeOperatorFile(payload,username) {
        return new GeneralFormDataService.asyncService(payload, `/operator/storeOperatorFile/${username}`);
    }

    async deleteFile(payload) {
        //return new GeneralFormDataService.asyncService(payload, this.servicePort(), this.serviceEndPoint() + "/deleteFile");
    }
}
export default new FileStorageService();