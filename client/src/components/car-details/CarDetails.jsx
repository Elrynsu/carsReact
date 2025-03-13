import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import carService from '../../services/carService';

export default function CarDetails() {
    const { carId } = useParams();
    const [car, setCar] = useState({});

    useEffect(() => {
        carService.getOne(carId)
            .then(result => {
                setCar(result)
                    .catch(err => console.error('Error fetching the car:', err));
            })
    }, [carId])

    return (
        <div className="container my-5">
            <div className="card shadow-sm rounded-0 border-dark">
                {car.imageUrl && (
                    <img src={car.imageUrl} className="card-img-top rounded-0" style={{ height: '380px', objectFit: 'cover' }} alt={`${car.brand} ${car.model}`} />
                )}
                <div className="card-body">
                    <h2 className="card-title text-center">{car.brand} {car.model}</h2>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><strong>Year:</strong> {car.year}</li>
                        <li className="list-group-item"><strong>Price:</strong> ${Number(car.price).toLocaleString()}</li>
                        <li className="list-group-item"><strong>Country of Origin:</strong> {car.origin}</li>
                        <li className="list-group-item"><strong>Summary:</strong> {car.summary}</li>
                    </ul>

                    <div className="text-center mt-4">
                        <Link to="/cars" className="btn btn-dark">⬅ Back to Catalog</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
