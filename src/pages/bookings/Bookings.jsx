import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { Link, useParams } from "react-router-dom";
import BookingItemCard from "./ui/BookingItemCard";
import PastBookingItemCard from "./ui/PastBookingItemCard";
import './ui/Bookings.css'

export default function Bookings(){
    const {request, user, serverUrl} = useContext(AppContext);

    const {login} = useParams();
    const [bookings, setBookings] = useState([]);
    const [hasActive, setHasActive] = useState(false);
    const [activeFilter, setActiveFilter] = useState("past")

    useEffect(() => {
        request('/api/user/' + login)
            .then(user => {
                const items = user.bookingItems
                setBookings(items); 

                const active = items.some(booking => booking.deletedAt == null && new Date(booking.endDate) > Date.now());
                setHasActive(active);
            })
            .catch(e => console.error(e));
    }, [login]);

    const filteredBookings = bookings.filter(booking => {
        if(activeFilter === "cancelled")
        {
            return booking.deletedAt !== null;
        }
        else
        {
            return booking.deletedAt === null && new Date(booking.endDate) < Date.now();
        }
    })

    const activeBookings = bookings.filter(booking => {
        return new Date(booking.endDate) > Date.now() && booking.deletedAt === null;
    });

    
    return <>
    <div className="container mb-5 mt-3">
        {
            <div className="container-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="fw-bold m-0">Bookings & Trips</h1>
                    <Link to="/help" className="text-primary fw-semibold">Can't find a booking?</Link>
                </div>

                {!hasActive ? (
                    <div className="d-flex flex-column flex-md-row align-items-center mt-5 p-4">
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

                ) : <>
                    {activeBookings.length > 0 && (
                        activeBookings.map(booking => (
                           <div key={booking.id} className="col-12 mb-3">
                                <BookingItemCard id={booking.id} booking={booking}/>    
                            </div> 
                        ))
                    )}
                </>
                }

                <div className="d-flex gap-2 mb-4">
                    <button onClick={() => setActiveFilter("past")} className={`btn filter-btn ${activeFilter === 'past' ? 'btn-active' : 'btn-inactive'}`} >Past</button>
                    <button onClick={() => setActiveFilter("cancelled")} className={`btn filter-btn ${activeFilter === 'cancelled' ? 'btn-active' : 'btn-inactive'}`}>Cancelled</button>
                </div>

                <div className="row g-4">
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map(booking => (
                            <div key={booking.id} className="col-12 col-md-6 col-lg-4">
                                <PastBookingItemCard id={booking.id} booking={booking}/>    
                            </div>
                        ))
                    ) : (
                        <div className="d-flex flex-column flex-md-row align-items-center mt-5 p-4">
                            <div className="mb-4 mb-md-0 me-md-5" style={{ maxWidth: '200px' }}>
                                <img className="img-fluid" src={`${serverUrl}/Storage/Item/TripsEmptyScreenCancelled.png`} alt="No trips" />
                            </div>
                            <div>
                                <h4 className="fw-bold mb-2">Sometimes plans change</h4>
                                <p className="text-muted fs-6 mb-0">
                                    Here you'll see your past trips and all the trips you've canceled. Maybe next time!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        }
    </div>
    </>
}