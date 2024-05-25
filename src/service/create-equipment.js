import axiosInstance, { API_URL } from "@/configs/axios-config.js";
import ServiceBase from "@/service/service-base.js";

export default class CreateEquipment extends ServiceBase {

    async getEquipmentNames() {
        return await axiosInstance.get(API_URL + "equipmentsByName");
    }

    async getEquipmentByID(id) {
        return await axiosInstance.get(API_URL + `equipments/${id}`);
    }

    async saveNewEquipment(request) {
        return await axiosInstance.post(API_URL + "equipments", request);
    }
}
