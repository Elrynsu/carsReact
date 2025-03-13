import { useEffect, useState } from "react";
import carService from "../../services/carService";
import CarListItem from "./CarListItem";

export default function CarList() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        carService.getAll()
            .then(data => setCars(data))
            .catch(err => console.error('Failed to fetch cars:', err));
    }, []);


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">🚘 Car Catalog</h2>
            <div className="row">
                {cars.length > 0 
                    ? cars.map(car => <CarListItem key={car._id} {...car} />)
                    : <h3 className="no-cars">No cars yet</h3>
                }
            </div>
        </div>
    )
}
