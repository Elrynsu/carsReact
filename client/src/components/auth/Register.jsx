import { Link, useNavigate } from 'react-router';
import { useRegister } from '../../api/authApi';
import { useContext, useRef } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ErrorNotification from '../common/ErrorNotification';
import useErrorNotification from '../../hooks/useErrorNotification';

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useContext(UserContext);
    const formRef = useRef(null);
    const { error, showError, clearError } = useErrorNotification();

    const registerHandler = async (formData) => {
        clearError();

        const form = formRef.current;

        if (!form.checkValidity()) {
            const firstInvalidInput = form.querySelector(':invalid');
            const fieldName = firstInvalidInput.getAttribute('name');

            const friendlyNames = {
                email: 'Email',
                password: 'Password',
                confirmPassword: 'Confirm Password',
            };

            const firstFieldName = friendlyNames[fieldName] || fieldName;
            const message = `${firstFieldName}: ${firstInvalidInput.validationMessage}`;

            showError(message);
            setTimeout(() => clearError(), 3500);
            return;
        }

        const { email, password, confirmPassword } = Object.fromEntries(formData);

        if (password !== confirmPassword) {
            showError('Passwords do not match.');
            setTimeout(() => clearError(), 3500);
            return;
        }

        try {
            const authData = await register(email, password);
            userLoginHandler(authData);
            navigate('/cars');
        } catch (err) {
            showError(err.message || 'Registration failed. Please try again.');
            setTimeout(() => clearError(), 3500);
        }
    };


    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card shadow-sm rounded-0 border-dark" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-header bg-dark text-white rounded-0 text-center">
                    <h3>📝 Register</h3>
                </div>

                <div className="card-body">
                    <ErrorNotification message={error} onClose={clearError} />
                    <form ref={formRef} action={registerHandler} noValidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Your email..." required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Choose a username..."  minLength="3" maxLength="20" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Your password..." minLength="5" maxLength="25" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password..." minLength="5" maxLength="25" required />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark">Register</button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/auth/login">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}