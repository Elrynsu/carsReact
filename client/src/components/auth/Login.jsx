import { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { useLogin } from '../../api/authApi';
import { UserContext } from '../../contexts/UserContext';

export default function Login() {
    const navigate = useNavigate();
    const { userLoginHandler } = useContext(UserContext);
    const { login } = useLogin();

    const loginHandler = async (formData) => {
        const values = Object.fromEntries(formData);
        const authData = await login(values.email, values.password);
        userLoginHandler(authData);
        navigate('/cars');
    };

    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card shadow-sm rounded-0 border-dark" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-header bg-dark text-white rounded-0 text-center">
                    <h3>🔑 Login</h3>
                </div>

                <div className="card-body">
                    <form action={loginHandler}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Your email..." required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Your password..." required />
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