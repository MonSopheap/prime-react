import { MethodEnum } from "../commom/Enum";
import AxiosInstanceService from "./axios/AxiosInstance";

class RoleService {
    async getRols() {
        try {
            const response = await AxiosInstanceService("/role/gets/s", MethodEnum.GET);
            console.log(`RESPONSE:`, response)
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default RoleService;