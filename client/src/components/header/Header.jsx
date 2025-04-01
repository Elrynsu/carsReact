import { useContext } from "react"
import { Link } from "react-router"
import { UserContext } from "../../contexts/UserContext"


export default function Header() {
    const { email } = useContext(UserContext);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between align-items-center py-2">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <img
                        src="/images/carLogo.jpg"
                        alt="Logo"
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    Car Marketplace
                </Link>

                <ul className="navbar-nav d-flex flex-row gap-3 mb-0">
                    <li className="nav-item">
                        <Link className="nav-link text-white" to="/cars">Catalog</Link>
                    </li>
                    {email
                        ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/cars/create">Create</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/auth/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/auth/logout">Logout</Link>
                                </li>
                            </>
                        )
                        : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/auth/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/auth/register">Register</Link>
                                </li>
                            </>
                        )}
                </ul>
            </div>
        </nav>
    )
}
