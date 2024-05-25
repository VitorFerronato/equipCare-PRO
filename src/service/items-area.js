import axiosInstance, { API_URL } from "@/configs/axios-config.js";
import ServiceBase from "@/service/service-base.js";

export default class CreateItem extends ServiceBase {

    async getItems() {
        return await axiosInstance.get(API_URL + "items");
    }
}
