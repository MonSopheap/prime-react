import AxiosInstanceService from "../commom/AxiosInstance";
import { MethodEnum } from "../commom/Enum";

class RoleService {
    getRols = async () => {
        try {
            const response = await AxiosInstanceService("/role/gets", MethodEnum.GET);
            console.log(`RESPONSE:`, response)
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default RoleService;