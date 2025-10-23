import { useContext, useEffect, useState } from "react";
import AppContext from "../../features/context/AppContext";
import { useParams } from "react-router-dom";
import BookingItemCard from "./ui/BookingItemCard";

export default function Bookings(){
    const {request, user} = useContext(AppContext);
    const {login} = useParams();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        console.log('Fetching bookings for', login);
        request('/api/user/' + login)
        .then(user => setBookings(user.bookingItems))
        .catch(e => alert(e.status.message));
    }, [login]);
    
    return <>
        <h2>Bookings</h2>
        {
            bookings.map(b =>
                <BookingItemCard key={b.id} id={b.id} />
            )
        }
    </>
}