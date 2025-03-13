import { useEffect, useState } from "react";
import carService from "../../services/carService";

export default function CarList() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        carService.getAll()
            .then(data => setCars(data))
            .catch(err => console.error('Failed to fetch cars:', err));
    }, []);


  return (
    <div className="container mt-4">
            <h2 className="mb-3">Car Listings</h2>
            <div className="row">
                {cars.map(car => (
                    <div className="col-md-4 mb-3" key={car._id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{car.brand}</h5>
                                <p className="card-text">Model: {car.model}</p>
                                <p className="card-text">Year: {car.year}</p>
                                <p className="card-text">Price: ${car.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}
