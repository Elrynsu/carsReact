import { Link } from "react-router"

export default function Home() {

    return (
        
        <div className="container home-overlay text-center py-5 my-5 rounded shadow-lg">
        <h1 className="display-4 fw-bold mb-3">✨ Find Your Dream Car</h1>
        <p className="lead mb-5">Browse stunning listings or create your own. The road begins here.</p>
  
        <div className="bg-dark text-white py-4 px-3 rounded shadow-sm mb-5">
          <h3 className="fw-light">🚗 Whether you're a buyer, seller, or car enthusiast — you're in the right place.</h3>
          <p className="mt-3 fs-5">
            Our platform makes it easy to connect, explore, and list cars with a seamless experience.
          </p>
        </div>
  
        <Link to="/cars" className="btn btn-dark btn-lg px-5">🏁 Start Browsing</Link>
  
        <p className="mt-4 mb-0">
          Don't have an account? <Link className="text-dark fw-bold" to="/auth/register">Register here</Link>
        </p>
        <p>
          Already registered? <Link className="text-dark fw-bold" to="auth/profile">Go to My Profile</Link>
        </p>
  
        <hr className="my-5" />
  
        <p className="text-muted small">
          More features coming soon: personalized recommendations, saved favorites, and more.
        </p>
      </div>
        )
}
