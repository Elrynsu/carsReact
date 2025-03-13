import { Link } from 'react-router';


export default function CarListItem({
    _id,
    brand,
    model,
    year,
    price,
    imageUrl
}) {
    return (
        <div className="col-md-5 mb-4">
            <div className="card h-100 border border-dark shadow-sm rounded-0">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        className="card-img-top rounded-0"
                        alt={`${brand} ${model}`}
                        style={{ height: '180px', objectFit: 'cover' }}
                    />
                )}
                <div className="card-body">
                    <h5 className="card-title text-center mb-2">{brand} {model}</h5>
                    <p className="card-text border-bottom pb-1 mb-3">Year: {year}</p>
                    <p className="card-text border-bottom pb-1 mb-3">Price: ${Number(price).toLocaleString()}</p>

                    <div className="text-center mt-3">
                        <Link to={`/cars/${_id}/details`} className="btn btn-dark btn-sm px-4">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
