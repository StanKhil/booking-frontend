import { useContext, useEffect, useState } from "react";
import AppContext from "../../../features/context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import {PenLine, CalendarSync, CalendarOff} from "lucide-react"

export default function PastBookingItemCard({id}){
    const {request, serverUrl} = useContext(AppContext);
    const [booking, setBooking] = useState(null);
    
    useEffect(() => {
        request('/api/booking-item/' + id)
        .then(r => setBooking(r)).catch(e => alert(e.status.message));
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
            <img 
                src={`${serverUrl}/Storage/Item/${booking.image || 'default.png'}`} 
                alt={booking.city} 
                className="booking-thumbnail"
            />
            <div className="booking-info">
                <div className="booking-city">{booking.city}</div>
                <p className="booking-details">
                    {formatDate(booking.startDate)} – {formatDate(booking.endDate)}
                </p>
                <p className="booking-details">
                    1 booking
                </p>
            </div>
        </div>
    );
}