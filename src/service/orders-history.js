import axiosInstance, { API_URL } from "@/configs/axios-config.js";
import ServiceBase from "@/service/service-base.js";

export default class ListOrdersHistory extends ServiceBase {

    async setNewOrderHistory(request) {
        return await axiosInstance.post(API_URL + "orders", request);
    }
    async getOrdersHistory() {
        return await axiosInstance.get(API_URL + "orders");
    }
}
