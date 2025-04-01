import { useNavigate, useParams } from "react-router"
import { useCar, useEditCar } from "../../api/carsApi";

export default function CarEdit() {
    const navigate = useNavigate();
    const { carId } = useParams();
    const { car } = useCar(carId);
    const { edit } = useEditCar();

    const formAction = async (formData) => {
        const carData = Object.fromEntries(formData);

        try{
            await edit(carId, carData);

            navigate(`/cars/${carId}/details`);
        } catch(err) {
            console.error(err.message);
        }

    }

    return (
        <section className="edit-car-page container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white text-center rounded-top">
                            <h4 className="mb-0">✏️ Edit Car Listing</h4>
                        </div>
                        <div className="card-body bg-light rounded-bottom">
                            <form action={formAction}>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="brand"
                                        name="brand"
                                        defaultValue={car.brand}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="model" className="form-label">Model</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="model"
                                        name="model"
                                        defaultValue={car.model}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="origin" className="form-label">Country of Origin</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="origin"
                                        name="origin"
                                        defaultValue={car.origin}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        name="imageUrl"
                                        defaultValue={car.imageUrl}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="year" className="form-label">Year</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="year"
                                        name="year"
                                        defaultValue={car.year}
                                        min="1890"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        defaultValue={car.price}
                                        min="0"
                                        step="50.00"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="summary" className="form-label">Summary</label>
                                    <textarea
                                        className="form-control"
                                        id="summary"
                                        name="summary"
                                        rows="4"
                                        defaultValue={car.summary}
                                        required
                                    />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-dark btn-lg">✅ Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}