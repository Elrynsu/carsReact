import { useEffect, useState } from "react";
import carService from "../../services/carService";
import { Link } from "react-router";

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
                {cars.map(car => (
                    <div className="col-md-5 mb-4" key={car._id}>
                        <div className="card h-100 border border-dark shadow-sm rounded-0">
                            {car.imageUrl && (
                                <img
                                    src={car.imageUrl}
                                    className="card-img-top rounded-0"
                                    alt={`${car.brand} ${car.model}`}
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title text-center mb-2">{car.brand} {car.model}</h5>
                                <p className="card-text border-bottom pb-1 mb-3">Year: {car.year}</p>
                                <p className="card-text border-bottom pb-1 mb-3">Price: ${Number(car.price).toLocaleString()}</p>

                                <div className="text-center mt-3">
                                <Link to={`/cars/${car._id}/details`} className="btn btn-dark btn-sm px-4">View Details</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
