import axiosInstance, { API_URL } from "@/configs/axios-config.js";
import ServiceBase from "@/service/service-base.js";

export default class CreateItem extends ServiceBase {

    async getItems() {
        return await axiosInstance.get(API_URL + "items");
    }

    async createItem(item) {
        return await axiosInstance.post(API_URL + `items`,item);
    }

    async updateItem(item) {
        return await axiosInstance.put(API_URL + `items/${item.id}`, item);
    }

    async deleteItem(id) {
        return await axiosInstance.delete(API_URL + `items/${id}`);
    }


}
