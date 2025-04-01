import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { useLogin } from '../../api/authApi';
import { UserContext } from '../../contexts/UserContext';
import useErrorNotification from '../../hooks/useErrorNotification';
import ErrorNotification from '../common/ErrorNotification';

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();
    const formRef = useRef(null);
    const { error, showError, clearError } = useErrorNotification();

    const loginHandler = async (formData) => {
        clearError();

        const form = formRef.current;

        if (!form.checkValidity()) {
            const firstInvalidInput = form.querySelector(':invalid');
            const fieldName = firstInvalidInput.getAttribute('name');

            const friendlyNames = {
                email: 'Email',
                password: 'Password',
            };

            const firstFieldName = friendlyNames[fieldName] || fieldName;
            const message = `${firstFieldName}: ${firstInvalidInput.validationMessage}`;

            showError(message);
            setTimeout(() => clearError(), 3500);
            return;
        }  

        try{
            const values = Object.fromEntries(formData);
            const authData = await login(values.email, values.password);
            userLoginHandler(authData);
            navigate('/cars');
        }catch(err) {
            showError(err.message || 'Login failed. Please try again.');
            setTimeout(() => clearError(), 3500);
        }
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card shadow-sm rounded-0 border-dark" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-header bg-dark text-white rounded-0 text-center">
                    <h3>🔑 Login</h3>
                </div>

                <div className="card-body">
                    <ErrorNotification message={error} onClose={clearError} />
                    <form ref={formRef} action={loginHandler} noValidate>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Your email..."  required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Your password..." minLength="5" maxLength="25" required />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-dark">Login</button>
                        </div>
                    </form>

                    <div className="text-center mt-3">
                        <p>Don't have an account? <Link to="/auth/register">Register here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}