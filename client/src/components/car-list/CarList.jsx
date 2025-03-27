import CarListItem from "./CarListItem";
import { useCars } from "../../api/carsApi";

export default function CarList() {
    
    const { cars } = useCars()

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">🚘 Car Catalog</h2>
            <div className="row">
                {cars.length > 0 
                    ? cars.map(car => <CarListItem key={car._id} {...car} />)
                    : <h3 className="no-cars">No cars yet</h3>
                }
            </div>
        </div>
    )
}
