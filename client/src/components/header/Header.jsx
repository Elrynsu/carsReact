import { Link } from "react-router"


export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Car Marketplace</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cars">Catalog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cars/create">Create Car</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
