import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import {PenLine, CalendarSync, CalendarOff} from "lucide-react"

export default function PastBookingItemCard({id}){
    const {request, serverUrl} = useContext(AppContext);
    const [booking, setBooking] = useState(null);
    
    useEffect(() => {
    request('/api/booking-item/' + id)
        .then(r => {
            setBooking(r);
            console.log(r);
        })
        .catch(e => alert(e.status.message));
    }, [id]);


   
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <div className="past-booking-card">
            {booking?.images[0] ? (
                <img 
                    src={`${serverUrl}/Storage/Item/${booking.images[0].imageUrl}`}
                    alt={booking.realty.city.name}
                    className="booking-thumbnail"
                />
            ) : (
                <img 
                    src={`https://placehold.co/400x300/e0e0e0/333333?text=` || 'No Image'}
                    alt='No Image'
                    className="booking-thumbnail"
                />
            )}
            <div className="booking-info">
                {booking && booking.realty.city ? (
                    <div className="booking-city">{booking.realty.city.name}</div>
                ) : (
                    <div className="booking-city">Unknown City</div>
                )}
                {booking && booking.startDate && booking.endDate ? (
                    <div className="booking-dates">
                        {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                    </div>
                ) : (
                    <div className="booking-dates">Unknown Dates</div>
                )}
                <p className="booking-details">
                    1 booking
                </p>
            </div>
        </div>
    );
}