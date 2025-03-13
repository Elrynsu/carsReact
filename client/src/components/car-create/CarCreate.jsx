import { useNavigate } from 'react-router';
import carService from '../../services/carService';

export default function CarCreate() {
    const navigate = useNavigate();

    const submitAction = async (FormData) => {
        const carData = Object.fromEntries(FormData);
        await carService.create(carData);
        navigate('/cars');
    }

    return (
        <section className="create-car-page container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white text-center rounded-top">
                            <h4 className="mb-0">🚗 Create a New Car Listing</h4>
                        </div>
                        <div className="card-body bg-light rounded-bottom">
                            <form action={submitAction}>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input type="text" className="form-control" id="brand" name="brand" placeholder="Enter car brand..." required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="model" className="form-label">Model</label>
                                    <input type="text" className="form-control" id="model" name="model" placeholder="Enter car model..." required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="origin" className="form-label">Country of Origin</label>
                                    <input type="text" className="form-control" id="origin" name="origin" placeholder="e.g. Germany, Japan, USA" required />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="imageUrl" className="form-label">Image URL</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="imageUrl"
                                        name="imageUrl"
                                        placeholder="Post image here..."
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="year" className="form-label">Year</label>
                                    <input type="number" className="form-control" id="year" name="year" placeholder="e.g. 2023" min="1890" required />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" name="price" placeholder="e.g. $15,000" min="0" step="50.00" required />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="summary" className="form-label">Summary</label>
                                    <textarea className="form-control" id="summary" name="summary" rows="4" placeholder="Add a brief description about the car..." required></textarea>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-dark btn-lg">💾 Create Car</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
