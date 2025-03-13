import request from "../utils/request";

const baseUrl = 'http://localhost:3030/jsonstore/cars';

export default {
    async getAll() {
        const result = await request.get(baseUrl);
        return Object.values(result);
    },
    getOne(carId) {
        return request.get(`${baseUrl}/${carId}`);
    },
    create(carData) {
        return request.post(baseUrl, carData);
    },
    edit(carId, carData) {
        return request.put(`${baseUrl}/${carId}`, {...carData, _id: carId});
    },
    delete(carId) {
        return request.delete(`${baseUrl}/${carId}`);
    }
}