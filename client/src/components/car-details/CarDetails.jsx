import { useEffect, useId, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { useCar, useDeleteCar, useLikeCar } from '../../api/carsApi';

export default function CarDetails() {
    const navigate = useNavigate();
    const { _id: userId, accessToken } = useAuth();
    const { carId } = useParams();
    const { car } = useCar(carId);
    const { deleteCar } = useDeleteCar();
    const { likeCar, getCarLikes, hasUserLikedCar } = useLikeCar();

    const [hasLiked, setHasLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const isOwner = car?._ownerId === userId;

    useEffect(() => {
        async function fetchLikes() {
            try {
                const likes = await getCarLikes(carId);

                setLikeCount(Array.isArray(likes) ? likes.length : 0);

                const userLiked = likes.some(like => like.userId === userId);

                setHasLiked(userLiked);
            } catch (error) {
                console.error("Error fetching likes:", error);
                setLikeCount(0);
            }
        }
        fetchLikes();
    }, [carId, userId]);



    const carDeleteClickHandler = async () => {
        const hasConfirmed = confirm(`You are about to delete ${car.brand} car, do you wish to proceed?`);

        if (!hasConfirmed) {
            return;
        }

        await deleteCar(carId);

        navigate('/cars');
    };

    const carKudosClickHandler = async () => {
        if (!car || hasLiked) {
            return;
        }
    
        try {
            const likes = await getCarLikes(carId);
            if (likes.some(like => like.userId === userId)) {
                return;
            }
    
            await likeCar(carId, userId);

            setHasLiked(true);
            setLikeCount(prev => prev + 1);
        } catch (error) {
            console.error("Kudos Error:", error.message);
        }
    };


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

                        {/* Show Edit/Delete buttons only for the owner */}
                        {isOwner && (
                            <>
                                <Link to={`/cars/${carId}/edit`} className="btn btn-warning mx-2">✏ Edit</Link>
                                <button
                                    onClick={carDeleteClickHandler}
                                    className="btn btn-danger"
                                >
                                    🗑 Delete
                                </button>
                            </>
                        )}

                        {/* Show Kudos button only for non-owners */}
                        {userId && !isOwner && (
                            <button
                                onClick={carKudosClickHandler}
                                className="btn btn-primary mx-2"
                                disabled={hasLiked} // Use `hasLiked` instead of rechecking the array
                            >
                                {hasLiked
                                    ? `✅ Kudos Given (${likeCount})`
                                    : `👏 Give Kudos (${likeCount})`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
