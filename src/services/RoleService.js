import AxiosInstanceService from "../commom/AxiosInstance";
import { MethodEnum } from "../commom/MethodEnum";

class RoleService {
    async getRoles() {
        try {
            const response = await AxiosInstanceService("/role/gets", MethodEnum.GET);
            console.log(response)
            return response?.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await AxiosInstanceService(`/role/${id}`, MethodEnum.DELETE);
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }
    async save(obj) {
        try {
            const response = await AxiosInstanceService("/role", MethodEnum.POST, obj);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
}

export default RoleService;