import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { Link, useParams } from "react-router-dom";
import BookingItemCard from "./ui/BookingItemCard";

export default function Bookings(){
    const {request, user, serverUrl} = useContext(AppContext);

    const {login} = useParams();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        request('/api/user/' + login)
            .then(user => setBookings(user.bookingItems))
            .catch(e => console.error(e));
            console.log(bookings)
    }, [login]);


    return <>
    <div className="container mb-5 mt-3">
        {
            <div className="container-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold m-0">Bookings & Trips</h1>
                    <Link to="/help" className="text-primary fw-semibold">Can't find a booking?</Link>
                </div>

                {(bookings && bookings.length === 0) ? (
                    <div className="d-flex flex-column flex-md-row align-items-center mt-5 border rounded-3 p-4 bg-light">
                        <div className="mb-4 mb-md-0 me-md-5" style={{ maxWidth: '200px' }}>
                            <img className="img-fluid" src={`${serverUrl}/Storage/Item/TripsGlobe.png`} alt="No trips" />
                        </div>
                        <div>
                            <h4 className="fw-bold mb-2">Where to next?</h4>
                            <p className="text-muted fs-6 mb-0">
                                You haven’t started any trips yet. Once you make a booking, it'll appear here.
                            </p>
                        </div>
                    </div>

                ) : (
                    <div className="row">
                        <div className="col-12">
                            {bookings.map(b => (
                                <div key={b.id} className="mb-5">
                                    <BookingItemCard key={b.id} id={b.id} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        }
    </div>
    </>
}