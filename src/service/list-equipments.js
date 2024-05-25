import axiosInstance, { API_URL } from "@/configs/axios-config.js";
import ServiceBase from "@/service/service-base.js";

export default class ListEquipment extends ServiceBase {

    async getEquipments() {
        return await axiosInstance.get(API_URL + "equipments");
    }
}
