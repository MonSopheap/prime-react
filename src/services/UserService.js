import AxiosInstanceService from "../commom/AxiosInstance";
import { MethodEnum } from "../commom/Enum";

class UserService {
    login = async ({ userName, password }) => {
        try {
            const response = await AxiosInstanceService("/user/login", MethodEnum.POST, { userName: userName, password: password });
            console.log(`RESPONSE:`, response)
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default UserService;