import axiosInstance, { API_URL } from "@/configs/axios-config.js";
import ServiceBase from "@/service/service-base.js";

export default class CreateCategorie extends ServiceBase {

    async getCategories() {
        return await axiosInstance.get(API_URL + "categories");
    }

    async createCategorie(categorie) {
        return await axiosInstance.post(API_URL + `categories`, categorie);
    }

    async updateCategorie(categorie) {
        return await axiosInstance.put(API_URL + `categories/${categorie.id}`, categorie);
    }

    async deleteCategorie(id) {
        return await axiosInstance.delete(API_URL + `categories/${id}`);

    }


}
