import { Link } from 'react-router';

export default function Register() {
    return (
        <div className="container my-5 d-flex justify-content-center">
            <div className="card shadow-sm rounded-0 border-dark" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-header bg-dark text-white rounded-0 text-center">
                    <h3>📝 Register</h3>
                </div>

                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" placeholder="Your email..." required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input type="text" className="form-control" id="username" name="username" placeholder="Choose a username..." required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" name="password" placeholder="Your password..." required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder="Confirm password..." required />
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