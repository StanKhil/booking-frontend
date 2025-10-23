import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";

export default function BookingItemCard({id}){
    const {request} = useContext(AppContext);
    
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        request('/api/booking-item/' + id)
        .then(r => setBooking(r))
        .catch(e => alert(e.status.message));
    }, [id]);

    return <>
        {
            booking &&
            <div className="border p-2 mb-2">
            <h3>Booking #{booking.id}</h3>
            <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
            <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
            <p>Realty: {booking.realty.name}</p>
            <button className="btn btn-primary">Add Feedback</button>
        </div>
        }
    </>
}