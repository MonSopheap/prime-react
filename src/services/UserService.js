import AxiosInstanceService from "../commom/AxiosInstance";
import { MethodEnum } from "../commom/MethodEnum";

class UserService {
    async login({ userName, password }) {
        try {
            const response = await AxiosInstanceService("/user/login", MethodEnum.POST, { userName: userName, password: password });
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;