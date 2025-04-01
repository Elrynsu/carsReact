import { useNavigate } from 'react-router';
import { useCreateCar } from '../../api/carsApi';
import useErrorNotification from '../../hooks/useErrorNotification';
import ErrorNotification from '../common/ErrorNotification';
import { useRef } from 'react';

export default function CarCreate() {
    const navigate = useNavigate();
    const { create: createCar } = useCreateCar();
    const { error, showError, clearError } = useErrorNotification();
    const formRef = useRef(null);

    const submitAction = async (FormData) => {
        clearError();

        const form = formRef.current;

        if (!form.checkValidity()) {
            const firstInvalidInput = form.querySelector(':invalid');

            const fieldName = firstInvalidInput.getAttribute('name');
            const firstFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

            const validationMessage = firstInvalidInput.validationMessage;

            const message = `${firstFieldName}: ${validationMessage}`;
    
            showError(message);

            setTimeout(() => clearError(), 3500);
            return;
        }

        try{
            const carData = Object.fromEntries(FormData);
            
            await createCar(carData);
            navigate('/cars');
        } catch(err) {
            showError(err.message || 'Failed to create the car. Please try again.');
            setTimeout(() => clearError(), 2000);
        }
    }

    return (
        <section className="create-car-page container mt-5">
            <ErrorNotification message={error} onClose={clearError} />

            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-dark text-white text-center rounded-top">
                            <h4 className="mb-0">🚗 Create a New Car Listing</h4>
                        </div>
                        <div className="card-body bg-light rounded-bottom">
                        <form ref={formRef} action={submitAction} noValidate>
                                <div className="mb-3">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input type="text" className="form-control" id="brand" name="brand" placeholder="Enter car brand..." minLength="2" maxLength="25" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="model" className="form-label">Model</label>
                                    <input type="text" className="form-control" id="model" name="model" placeholder="Enter car model..." minLength="2" maxLength="25" required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="origin" className="form-label">Country of Origin</label>
                                    <input type="text" className="form-control" id="origin" name="origin" placeholder="e.g. Germany, Japan, USA" minLength="2" maxLength="25" required />
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
                                    <input type="number" className="form-control" id="year" name="year" placeholder="e.g. 2023" min="1890" max="2026" required />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" className="form-control" id="price" name="price" placeholder="e.g. $15,000" min="0" step="50.00" required />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="summary" className="form-label">Summary</label>
                                    <textarea className="form-control" id="summary" name="summary" rows="4" placeholder="Add a brief description about the car..." minLength="20" maxLength="500" required></textarea>
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
