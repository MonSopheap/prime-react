import AxiosInstanceService from "../commom/AxiosInstance";
import { MethodEnum } from "../commom/MethodEnum";

class GoogleOAuth2Service {
    async signIn() {
        try {
            const response = await AxiosInstanceService("/google/signIn", MethodEnum.GET);
            console.log(response)
            return response;
        } catch (error) {
            throw error;
        }
    }
}

export default GoogleOAuth2Service;