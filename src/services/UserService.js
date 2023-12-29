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

    async getUsers() {
        try {
            const response = await AxiosInstanceService("/user/gets", MethodEnum.GET,);
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await AxiosInstanceService(`/user/${id}`, MethodEnum.DELETE);
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }
    async save(obj) {
        try {
            const response = await AxiosInstanceService("/user/register", MethodEnum.POST, obj);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}

export default UserService;