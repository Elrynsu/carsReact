import { useEffect, useState } from "react";
import request from "../utils/request";
import useAuth from "../hooks/useAuth";



const baseUrl = 'http://localhost:3030/data/cars';
const likesUrl = 'http://localhost:3030/data/likes';

export const useCars = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        request.get(baseUrl)
            .then(setCars)
    }, []);

    return {
        cars,
    };
};

export const useCar = (carId) => {
    const [car, setCar] = useState({});

    useEffect(() => {
        request.get(`${baseUrl}/${carId}`)
            .then(setCar);
    }, [carId]);

    return {
        car,
    }
};

export const useCreateCar = () => {
    const { request } = useAuth();

    const create = (carData) => request.post(baseUrl, carData);

    return {
        create,
    }

};

export const useEditCar = () => {
    const { request } = useAuth();

    const edit = (carId, carData) => {
        return request.put(`${baseUrl}/${carId}`, {...carData, _id: carId});
    }

    return {
        edit,
    }
};

export const useDeleteCar = () => {
    const { request } = useAuth();

    const deleteCar = (carId) => {
        return request.delete(`${baseUrl}/${carId}`);
    }

    return {
        deleteCar,
    }
};

export const useLikeCar = () => {
    const { request } = useAuth();

    const likeCar = async (carId, userId) => {
        return request.post(`${likesUrl}`, { carId, userId });
    };

    const getCarLikes = async (carId) => {
        const encodedQuery = encodeURIComponent(`carId="${carId}"`);
        const result = await request.get(`${likesUrl}?where=${encodedQuery}`);

        return Array.isArray(result) ? result : []; 
    };

    return { likeCar, getCarLikes };
};

export const useGetUserCars = () => {
    const { request, _id: userId } = useAuth();

    const getUserCars = async () => {
        const query = encodeURIComponent(`_ownerId="${userId}"`);
        const url = `${baseUrl}?where=${query}`;

        return request.get(url);
    };

    return {
        getUserCars,
    }

}