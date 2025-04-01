import { useEffect, useState } from "react";
import { Link } from 'react-router';
import { useGetUserCars } from "../../api/carsApi";
import ErrorNotification from "../common/ErrorNotification";
import useErrorNotification from "../../hooks/useErrorNotification";

export default function Profile() {
    const { getUserCars } = useGetUserCars();
    const [userCars, setUserCars] = useState([]);
    const { error, showError, clearError } = useErrorNotification();

    useEffect(() => {
        clearError();
        getUserCars()
            .then(setUserCars)
            .catch(err => showError(err.message || 'Failed to load your cars.'));
    }, [getUserCars, showError, clearError]);

    return (
        <section className="container my-5">
            <ErrorNotification message={error} onClose={clearError} />

            <h2 className="mb-4">👤 My Car Listings</h2>

            {userCars.length === 0 ? (
                <p className="text-muted text-center">🚗 No cars in your private showroom yet.</p>
            ) : (
                <ul className="list-group">
                    {userCars.map(car => (
                        <li key={car._id} className="list-group-item d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                {car.imageUrl && (
                                    <img
                                        src={car.imageUrl}
                                        alt={`${car.brand} ${car.model}`}
                                        style={{ width: '80px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                                        className="rounded shadow-sm"
                                    />
                                )}
                                <div>
                                    <strong>{car.brand} {car.model}</strong> <span className="text-muted">({car.year})</span>
                                </div>
                            </div>
                            <Link to={`/cars/${car._id}/details`} className="btn btn-sm btn-outline-dark">
                                Details
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
