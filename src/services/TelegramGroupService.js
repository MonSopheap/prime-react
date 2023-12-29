import AxiosInstanceService from "../commom/AxiosInstance";
import { MethodEnum } from "../commom/MethodEnum";

class TelegramGroupService {
    async save(obj) {
        try {
            const response = await AxiosInstanceService("/telegramGroup", MethodEnum.POST, obj);
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async getList() {
        try {
            const response = await AxiosInstanceService("/telegramGroup/gets", MethodEnum.GET,);
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await AxiosInstanceService(`/telegramGroup/${id}`, MethodEnum.DELETE);
            if (response) return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default TelegramGroupService;